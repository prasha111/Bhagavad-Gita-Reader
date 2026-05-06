"use client";

import React, { useEffect, useState } from "react";

type ShlokType = {
  _id: string;
  chapter: number;
  shlokNumber: number;
  sanskrit: string;
  english: string;
  hindi: string;
  audio?: string;
  video?: string;
};

type FormState = {
  chapter: string;
  shlokNumber: string;
  sanskrit: string;
  english: string;
  hindi: string;
  audio: string;
  video: string;
};

type UiLanguage = "english" | "sanskrit";

const emptyForm: FormState = {
  chapter: "",
  shlokNumber: "",
  sanskrit: "",
  english: "",
  hindi: "",
  audio: "",
  video: "",
};

const uiText = {
  english: {
    cmsPanel: "CMS Panel",
    addEditShlok: "Add / Edit Shlok",
    allShloks: "All Shloks",
    settings: "Settings",
    addShlok: "Add Shlok",
    editShlok: "Edit Shlok",
    manageContent: "Manage your Gita content",
    chapter: "Chapter",
    shlokNumber: "Shlok Number",
    sanskritShlok: "Sanskrit Shlok",
    englishMeaning: "English Meaning",
    hindiMeaning: "Hindi Meaning",
    audioFile: "Audio File",
    videoFile: "Video File",
    audioUploaded: "Audio uploaded ✔",
    videoUploaded: "Video uploaded ✔",
    saving: "Saving...",
    updateShlok: "💾 Update Shlok",
    createShlok: "➕ Add Shlok",
    livePreview: "Live Preview",
    allShloksTitle: "All Shloks",
    loading: "Loading...",
    noShloks: "No shloks found.",
    sanskritSnippet: "Sanskrit (snippet)",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    readerSettings: "CMS Language Settings",
    chooseLanguage: "Choose which language the admin panel should use.",
    cmsSanskritMode: "Sanskrit Admin Mode",
    cmsSanskritOn:
      "Sanskrit admin mode is ON. The CMS interface labels are shown in Sanskrit.",
    cmsSanskritOff:
      "English admin mode is ON. The CMS interface labels are shown in English.",
    chapterPreview: "Chapter",
    shlokPreview: "Shlok",
    sanskritPlaceholder: "Sanskrit will appear here...",
    englishPlaceholder: "English meaning...",
    hindiPlaceholder: "Hindi meaning...",
    deleteConfirm: "Delete this shlok?",
    fetchError: "Error fetching shloks",
    saveError: "Error saving data",
    serverError: "Server error ❌",
    deleteError: "Error deleting shlok",
    deleteServerError: "Server error ❌",
    updateSuccess: "Shlok updated ✅",
    saveSuccess: "Saved to MongoDB ✅",
  },
  sanskrit: {
    cmsPanel: "सीएमएस-पट्टः",
    addEditShlok: "श्लोकं योजय / सम्पादय",
    allShloks: "सर्वे श्लोकाः",
    settings: "विन्यासाः",
    addShlok: "श्लोकं योजय",
    editShlok: "श्लोकं सम्पादय",
    manageContent: "गीता-सामग्रीं प्रबन्धय",
    chapter: "अध्यायः",
    shlokNumber: "श्लोक-संख्या",
    sanskritShlok: "संस्कृत-श्लोकः",
    englishMeaning: "आङ्ग्ल-भावार्थः",
    hindiMeaning: "हिन्दी-भावार्थः",
    audioFile: "श्रव्य-सञ्चिका",
    videoFile: "दृश्य-सञ्चिका",
    audioUploaded: "श्रव्य-सञ्चिका आरोपिता ✔",
    videoUploaded: "दृश्य-सञ्चिका आरोपिता ✔",
    saving: "संगृह्यते...",
    updateShlok: "💾 श्लोकं नवीकुरु",
    createShlok: "➕ श्लोकं योजय",
    livePreview: "प्रत्यक्ष-दृश्य",
    allShloksTitle: "सर्वे श्लोकाः",
    loading: "लोड्यते...",
    noShloks: "श्लोकाः न प्राप्ताः।",
    sanskritSnippet: "संस्कृतम् (अंशः)",
    actions: "क्रियाः",
    edit: "सम्पादय",
    delete: "लोपय",
    readerSettings: "सीएमएस-भाषा-विन्यासाः",
    chooseLanguage: "प्रशासन-पट्टस्य भाषां चिनुत।",
    cmsSanskritMode: "संस्कृत-प्रशासक-रीतिः",
    cmsSanskritOn:
      "संस्कृत-रीतिः चालू अस्ति। सीएमएस-पट्टस्य सर्वे शीर्षकाः संस्कृते दृश्यन्ते।",
    cmsSanskritOff:
      "आङ्ग्ल-रीतिः चालू अस्ति। सीएमएस-पट्टस्य सर्वे शीर्षकाः आङ्ग्लभाषायां दृश्यन्ते।",
    chapterPreview: "अध्यायः",
    shlokPreview: "श्लोकः",
    sanskritPlaceholder: "अत्र संस्कृत-श्लोकः दृश्यते...",
    englishPlaceholder: "अत्र आङ्ग्ल-भावार्थः दृश्यते...",
    hindiPlaceholder: "अत्र हिन्दी-भावार्थः दृश्यते...",
    deleteConfirm: "एषः श्लोकः लोपयितव्यः किम्?",
    fetchError: "श्लोकानां प्राप्तौ दोषः",
    saveError: "दत्तांश-संग्रहे दोषः",
    serverError: "सर्वर-दोषः ❌",
    deleteError: "श्लोक-लोपने दोषः",
    deleteServerError: "सर्वर-दोषः ❌",
    updateSuccess: "श्लोकः नवीकृतः ✅",
    saveSuccess: "मङ्गोडीबी मध्ये संगृहीतः ✅",
  },
} as const;

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-2xl border border-gray-200 bg-[#fffdf9] px-4 py-4 cursor-pointer">
      <span className="text-sm font-medium text-[#3a2a1d]">{label}</span>

      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`h-7 w-12 rounded-full transition ${
            checked ? "bg-black" : "bg-gray-300"
          }`}
        >
          <div
            className={`h-5 w-5 rounded-full bg-white shadow-md mt-1 transition ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </div>
      </div>
    </label>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"add" | "list" | "settings">("add");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [shloks, setShloks] = useState<ShlokType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [uiLanguage, setUiLanguage] = useState<UiLanguage>("english");

  const t = uiText[uiLanguage];

  useEffect(() => {
    const saved = localStorage.getItem("cms-ui-language");
    if (saved === "english" || saved === "sanskrit") {
      setUiLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cms-ui-language", uiLanguage);
  }, [uiLanguage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchShloks = async () => {
    try {
      setIsLoadingList(true);
      const res = await fetch("/api/shlok");
      const data = await res.json();
      setShloks(data || []);
    } catch (err) {
      console.error(err);
      alert(t.fetchError);
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    if (activeTab === "list") {
      fetchShloks();
    }
  }, [activeTab]);

  const handleSubmit = async () => {
    try {
      setIsSaving(true);

      const payload = {
        chapter: Number(form.chapter),
        shlokNumber: Number(form.shlokNumber),
        sanskrit: form.sanskrit,
        english: form.english,
        hindi: form.hindi,
        audio: form.audio,
        video: form.video,
      };

      const url = editingId ? `/api/shlok/${editingId}` : "/api/shlok";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(editingId ? t.updateSuccess : t.saveSuccess);
        setForm(emptyForm);
        setEditingId(null);

        if (activeTab === "list") {
          fetchShloks();
        }
      } else {
        alert(t.saveError);
      }
    } catch (err) {
      console.error(err);
      alert(t.serverError);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (s: ShlokType) => {
    setForm({
      chapter: String(s.chapter),
      shlokNumber: String(s.shlokNumber),
      sanskrit: s.sanskrit,
      english: s.english,
      hindi: s.hindi,
      audio: s.audio || "",
      video: s.video || "",
    });
    setEditingId(s._id);
    setActiveTab("add");
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.deleteConfirm)) return;

    try {
      const res = await fetch(`/api/shlok/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.error || t.deleteError);
        return;
      }

      setShloks((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      alert(t.deleteServerError);
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadToCloudinary(file);

    setForm((prev) => ({
      ...prev,
      audio: url,
    }));
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadToCloudinary(file);

    setForm((prev) => ({
      ...prev,
      video: url,
    }));
  };

  const uploadToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.secure_url as string;
  };

  const isEditing = Boolean(editingId);

  return (
    <div className="min-h-screen flex bg-[#f5f5f5] text-black">
      <div className="w-64 bg-black text-white p-6 hidden md:block">
        <h2 className="text-xl font-semibold mb-6">{t.cmsPanel}</h2>

        <ul className="space-y-4 text-gray-300">
          <li
            className={`hover:text-white cursor-pointer ${
              activeTab === "add" ? "text-white" : ""
            }`}
            onClick={() => {
              setActiveTab("add");
              setEditingId(null);
              setForm(emptyForm);
            }}
          >
            📖 {t.addEditShlok}
          </li>

          <li
            className={`hover:text-white cursor-pointer ${
              activeTab === "list" ? "text-white" : ""
            }`}
            onClick={() => setActiveTab("list")}
          >
            📚 {t.allShloks}
          </li>

          <li
            className={`hover:text-white cursor-pointer ${
              activeTab === "settings" ? "text-white" : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙ {t.settings}
          </li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        {activeTab === "add" ? (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-serif">
                {isEditing ? t.editShlok : t.addShlok}
              </h1>
              <p className="text-gray-500">{t.manageContent}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="chapter"
                  placeholder={t.chapter}
                  value={form.chapter}
                  onChange={handleChange}
                  className="input"
                />
                <input
                  name="shlokNumber"
                  placeholder={t.shlokNumber}
                  value={form.shlokNumber}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <textarea
                name="sanskrit"
                placeholder={t.sanskritShlok}
                value={form.sanskrit}
                onChange={handleChange}
                className="input h-24"
              />

              <textarea
                name="english"
                placeholder={t.englishMeaning}
                value={form.english}
                onChange={handleChange}
                className="input h-24"
              />

              <textarea
                name="hindi"
                placeholder={t.hindiMeaning}
                value={form.hindi}
                onChange={handleChange}
                className="input h-24"
              />

              <div>
                <input
                  name="audio"
                  type="file"
                  onChange={handleAudioUpload}
                  className="input"
                />
                {form.audio && (
                  <p className="text-xs text-green-600 mt-1">
                    {t.audioUploaded} ({form.audio.slice(0, 40)}…)
                  </p>
                )}
              </div>

              <div>
                <input
                  name="video"
                  type="file"
                  onChange={handleVideoUpload}
                  className="input"
                />
                {form.video && (
                  <p className="text-xs text-green-600 mt-1">
                    {t.videoUploaded} ({form.video.slice(0, 40)}…)
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className="w-full bg-black text-white py-3 rounded-xl hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 transition"
              >
                {isSaving
                  ? t.saving
                  : isEditing
                  ? t.updateShlok
                  : t.createShlok}
              </button>
            </div>

            <div className="mt-8 max-w-2xl bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg mb-2">{t.livePreview}</h2>

              <p className="text-sm text-gray-500">
                {t.chapterPreview} {form.chapter || "–"} • {t.shlokPreview}{" "}
                {form.shlokNumber || "–"}
              </p>

              <p className="mt-2 font-serif text-lg">
                {form.sanskrit || t.sanskritPlaceholder}
              </p>

              <p className="mt-2 text-gray-700">
                {form.english || t.englishPlaceholder}
              </p>

              <p className="mt-2 text-gray-500 italic">
                {form.hindi || t.hindiPlaceholder}
              </p>
            </div>
          </>
        ) : activeTab === "list" ? (
          <div className="max-w-4xl bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl mb-4">{t.allShloksTitle}</h1>

            {isLoadingList ? (
              <p className="text-gray-500">{t.loading}</p>
            ) : shloks.length === 0 ? (
              <p className="text-gray-500">{t.noShloks}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">{t.chapter}</th>
                      <th className="text-left py-2">{t.shlokNumber}</th>
                      <th className="text-left py-2">{t.sanskritSnippet}</th>
                      <th className="text-left py-2">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shloks.map((s) => (
                      <tr key={s._id} className="border-b">
                        <td className="py-2">{s.chapter}</td>
                        <td className="py-2">{s.shlokNumber}</td>
                        <td className="py-2 max-w-xs truncate">
                          {s.sanskrit.slice(0, 50)}…
                        </td>
                        <td className="py-2 space-x-2">
                          <button
                            onClick={() => handleEdit(s)}
                            className="text-blue-600 hover:underline"
                          >
                            {t.edit}
                          </button>
                          <button
                            onClick={() => handleDelete(s._id)}
                            className="text-red-600 hover:underline"
                          >
                            {t.delete}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl bg-white p-6 rounded-2xl shadow space-y-4">
            <div>
              <h1 className="text-2xl font-serif">{t.readerSettings}</h1>
              <p className="text-sm text-gray-500 mt-1">{t.chooseLanguage}</p>
            </div>

            <ToggleRow
              label={t.cmsSanskritMode}
              checked={uiLanguage === "sanskrit"}
              onChange={(value) =>
                setUiLanguage(value ? "sanskrit" : "english")
              }
            />

            <div className="rounded-2xl bg-[#f7f7f7] p-4 text-sm text-gray-600">
              {uiLanguage === "sanskrit" ? t.cmsSanskritOn : t.cmsSanskritOff}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}