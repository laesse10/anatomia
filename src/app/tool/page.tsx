"use client";

import React, { useEffect } from "react";
import Link from "next/link";

/** ---- Minimal-Typen für Pyodide, damit kein `any` nötig ist ---- */
type PyodideFSStat = { mode: number };
type PyodideFS = {
  mkdirTree: (path: string) => void;
  writeFile: (path: string, data: Uint8Array | string) => void;
  readFile: (path: string) => Uint8Array;
  readdir: (path: string) => string[];
  stat: (path: string) => PyodideFSStat;
  isDir: (mode: number) => boolean;
};

type PyodideGlobals = {
  set: (name: string, value: unknown) => void;
};

type Pyodide = {
  loadPackage: (name: string) => Promise<void>;
  runPythonAsync: (code: string) => Promise<unknown>;
  FS: PyodideFS;
  globals: PyodideGlobals;
};

type WindowWithPyodide = Window &
  Partial<{
    loadPyodide: (opts: { indexURL: string }) => Promise<Pyodide>;
  }>;
/** ---------------------------------------------------------------- */

export default function ToolPage() {
  useEffect(() => {
    const statusEl = document.getElementById("status") as HTMLDivElement | null;
    const startBtn = document.getElementById("startBtn") as HTMLButtonElement | null;
    const fileInput = document.getElementById("fileInput") as HTMLInputElement | null;
    const shiftDatesEl = document.getElementById("shiftDates") as HTMLInputElement | null;
    const patientIdInput = document.getElementById("patientIdInput") as HTMLInputElement | null;

    // Ordnerauswahl aktivieren
    if (fileInput) fileInput.setAttribute("webkitdirectory", "");

    let pyodide: Pyodide | null = null;

    function log(msg: string) {
      if (!statusEl) return;
      statusEl.textContent += (statusEl.textContent ? "\n" : "") + msg;
      statusEl.scrollTop = statusEl.scrollHeight;
    }

    async function loadPyodideAndPackages(): Promise<Pyodide> {
      if (pyodide) return pyodide;
      log("Lade Pyodide …");

      // Pyodide-Skript laden (einmalig)
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
      const loaded = new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Pyodide script failed to load."));
      });
      document.body.appendChild(script);
      await loaded;

      const w = window as WindowWithPyodide;
      if (!w.loadPyodide) throw new Error("window.loadPyodide nicht verfügbar.");

      pyodide = await w.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/" });
      log("Pyodide geladen. Installiere pydicom …");

      await pyodide.loadPackage("micropip");
      await pyodide.runPythonAsync(`
import micropip
await micropip.install('pydicom==2.4.4')
      `);
      log("pydicom installiert.");
      return pyodide;
    }

    // Python-Code (unverändert zur Browser-Ausführung)
    const PY_CODE = `
import os, csv, uuid, random
from datetime import datetime, timedelta
from pathlib import Path
import pydicom
from pydicom.uid import generate_uid

DATE_TAGS = [
    "StudyDate", "SeriesDate", "AcquisitionDate", "ContentDate",
    "InstanceCreationDate", "PatientBirthDate"
]
TIME_TAGS = ["StudyTime", "SeriesTime", "AcquisitionTime", "ContentTime", "InstanceCreationTime"]
REMOVE_TAGS = [
    "PatientName","PatientID","OtherPatientIDs","OtherPatientNames","PatientBirthDate",
    "PatientBirthTime","PatientSex","PatientAddress","PatientTelephoneNumbers",
    "PatientEmailAddress","PatientComments","EthnicGroup","ResponsiblePerson",
    "ReferringPhysicianName","PerformingPhysicianName","OperatorsName","PhysiciansOfRecord",
    "AccessionNumber","InstitutionName","InstitutionAddress","InstitutionalDepartmentName",
    "StationName","DeviceSerialNumber","ProtocolName","StudyID","StudyDescription",
    "SeriesDescription","RequestingPhysician","RequestAttributesSequence"
]

def shift_date(val: str, days: int):
    try:
        if not val or len(val) != 8: return val
        dt = datetime.strptime(val, "%Y%m%d") + timedelta(days=days)
        return dt.strftime("%Y%m%d")
    except Exception:
        return val

def ensure_dir(p: Path):
    p.parent.mkdir(parents=True, exist_ok=True)

def anonymize_tree(inroot: Path, outroot: Path, shift_dates: bool):
    outroot.mkdir(parents=True, exist_ok=True)

    patient_id_map = {}
    study_uid_map, series_uid_map, sop_uid_map = {}, {}, {}
    date_shift = {}

    map_csv = outroot / "anonymization_mapping.csv"
    with map_csv.open("w", newline="") as f:
        log = csv.writer(f)
        log.writerow(["type","original","anonymized","patient_key","file_relpath"])

        for root, _, files in os.walk(inroot):
            for name in files:
                src = Path(root) / name
                rel = src.relative_to(inroot)
                try:
                    ds = pydicom.dcmread(str(src), force=True, stop_before_pixels=False)
                except Exception:
                    continue

                orig_pid = getattr(ds, "PatientID", None) or f"NOID-{uuid.uuid4().hex[:8]}"

                if orig_pid not in patient_id_map:
                    patient_id_map[orig_pid] = "P" + uuid.uuid4().hex[:12]
                    date_shift[orig_pid] = random.randint(0, 365) if shift_dates else 0
                pseudo_pid = patient_id_map[orig_pid];
                shift_days = date_shift[orig_pid];

                for tag in REMOVE_TAGS:
                    if tag in ds:
                        del ds[tag];

                if "StudyInstanceUID" in ds:
                    o = ds.StudyInstanceUID;
                    if o not in study_uid_map:
                        study_uid_map[o] = generate_uid();
                        log.writerow(["StudyInstanceUID", o, study_uid_map[o], pseudo_pid, str(rel)]);
                    ds.StudyInstanceUID = study_uid_map[o];
                if "SeriesInstanceUID" in ds:
                    o = ds.SeriesInstanceUID;
                    if o not in series_uid_map:
                        series_uid_map[o] = generate_uid();
                        log.writerow(["SeriesInstanceUID", o, series_uid_map[o], pseudo_pid, str(rel)]);
                    ds.SeriesInstanceUID = series_uid_map[o];
                if "SOPInstanceUID" in ds:
                    o = ds.SOPInstanceUID;
                    if o not in sop_uid_map:
                        sop_uid_map[o] = generate_uid();
                        log.writerow(["SOPInstanceUID", o, sop_uid_map[o], pseudo_pid, str(rel)]);
                    ds.SOPInstanceUID = sop_uid_map[o];

                for nm in DATE_TAGS:
                    if nm in ds and ds.get(nm):
                        ds.data_element(nm).value = shift_date(ds.data_element(nm).value, shift_days);

                ds.PatientID = pseudo_pid;
                ds.PatientName = "Anonymized";
                ds.remove_private_tags();

                out_path = outroot / rel;
                ensure_dir(out_path);
                ds.save_as(str(out_path));
                log.writerow(["PatientID", orig_pid, pseudo_pid, pseudo_pid, str(rel)]);

    return str(outroot), str(map_csv);
`;

    async function runAnonymizer(): Promise<void> {
      const files = Array.from(fileInput?.files ?? []);
      if (files.length === 0) {
        log("Bitte zuerst einen Ordner wählen.");
        return;
      }

      const pyo = await loadPyodideAndPackages();

      log(`Kopiere ${files.length} Datei(en) in das virtuelle Dateisystem …`);
      const inRoot = "/in";
      const outRoot = "/out";
      pyo.FS.mkdirTree(inRoot);
      pyo.FS.mkdirTree(outRoot);

      for (const f of files) {
        const rel = (f as File & { webkitRelativePath?: string }).webkitRelativePath || f.name;
        const path = `${inRoot}/${rel}`;
        const dir = path.substring(0, path.lastIndexOf("/"));
        if (dir) pyo.FS.mkdirTree(dir);
        const buf = new Uint8Array(await f.arrayBuffer());
        pyo.FS.writeFile(path, buf);
      }

      log("Starte Anonymisierung …");
      const shift = Boolean(shiftDatesEl?.checked);

      try {
        pyo.globals.set("PY_CODE", PY_CODE);
        await pyo.runPythonAsync("exec(PY_CODE, globals())");
        pyo.globals.set("inroot", "/in");
        pyo.globals.set("outroot", "/out");
        pyo.globals.set("shift_dates", shift);
        // Rückgabewerte werden nicht verwendet → kein ungenutztes Binding erzeugen
        await pyo.runPythonAsync(`anonymize_tree(Path(inroot), Path(outroot), shift_dates)`);
        log("Anonymisierung abgeschlossen. Verpacke Ergebnisse …");

        // ZIP im Python-Layer erstellen und dann aus dem FS holen
        await pyo.runPythonAsync(`import shutil; shutil.make_archive('${outRoot}', 'zip', '${outRoot}')`);
        const zipData = pyo.FS.readFile(`${outRoot}.zip`) as Uint8Array;
        const blob = new Blob([new Uint8Array(zipData)], { type: "application/zip" });
        const url = URL.createObjectURL(blob);

        const patientId = patientIdInput?.value.trim();
        if (!patientId) {
          log("Bitte geben Sie eine Patienten-ID ein.");
          return;
        }

        const zipFileName = `${patientId}_Dicoms.zip`;

        const a = document.createElement("a");
        a.href = url;
        a.download = zipFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        log("ZIP-Datei wurde heruntergeladen.");
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(e);
        log("Fehler während der Ausführung: " + msg);
      }
      log("Fertig. ZIP ist bereit zum Download.");
    }

    startBtn?.addEventListener("click", () => {
      if (startBtn) startBtn.disabled = true;
      if (statusEl) statusEl.textContent = "Initialisiere …";
      runAnonymizer().finally(() => {
        if (startBtn) startBtn.disabled = false;
      });
    });
  }, []);

  return (
    <div className="h-full text-slate-100">
      <div className="max-w-5xl mx-auto p-6">
        <header className="flex flex-col items-start gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-black">Dicom Anonymisierungs Tool</h1>
          <Link href="/">
            <button className="rounded-xl bg-gray-600 hover:bg-gray-500 px-4 py-2 text-sm font-medium">
              Zurück
            </button>
          </Link>
        </header>

        <p className="mt-4 text-slate-300">
          Alle Dateien bleiben im Browser (kein Upload auf den Server). Wähle einen DICOM-Ordner, optional
          Datumsshift aktivieren, dann <span className="mono">Start</span>. Ergebnis ist ein ZIP mit anonymisierten
          DICOMs und <span className="mono">anonymization_mapping.csv</span>.
        </p>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-900/60 p-4 shadow">
            <label className="block text-sm mb-2">DICOM-Eingabeordner</label>
            <input
              id="fileInput"
              type="file"
              multiple
              className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-500"
            />
            <p className="mt-2 text-xs text-slate-400">
              Tipp: Wähle den Studien-/Serie-Ordner; die Ordnerstruktur wird im ZIP gespiegelt.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <input id="shiftDates" type="checkbox" className="h-4 w-4" />
              <label htmlFor="shiftDates" className="text-sm">
                Datumsschift pro Patient (0..365 Tage)
              </label>
            </div>

            <div className="mt-4">
              <label htmlFor="patientIdInput" className="block text-sm mb-2">Patienten-ID (optional)</label>
              <input
                id="patientIdInput"
                type="text"
                placeholder="Geben Sie die Patienten-ID ein um die Output Datei zu benennen"
                className="block w-full text-sm rounded-xl border-gray-300 px-4 bg-gray-400 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                id="startBtn"
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium disabled:opacity-50"
              >
                Start
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/60 p-4 shadow">
            <label className="block text-sm mb-2">Status</label>
            <div
              id="status"
              className="mono text-xs whitespace-pre-wrap bg-black/30 rounded-xl p-3 h-56 overflow-auto"
            >
              Bereit.
            </div>
          </div>
        </section>

        <footer className="mt-8 text-xs text-slate-500">
          <p>
            <strong>Beispiel:</strong> Du wählst einen Ordner mit <em>120 DICOMs</em>, aktivierst die Datumsschift und
            klickst auf <em>Start</em>. Nach dem Lauf erhältst du ein ZIP mit der gleichen Ordnerstruktur, anonymisierten
            UIDs/Patientenfeldern sowie eine Mapping-CSV für die Nachvollziehbarkeit.
          </p>
        </footer>
      </div>
    </div>
  );
}