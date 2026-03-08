import { X, Save, Plus, Trash2, Download, Upload } from "lucide-react";
import { useState } from "react";
import { PortfolioData } from "../lib/portfolio-data";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface EditorPanelProps {
  data: PortfolioData;
  onSave: (data: PortfolioData) => void;
  onClose: () => void;
}

export function EditorPanel({ data, onSave, onClose }: EditorPanelProps) {
  const [editedData, setEditedData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<
    "personal" | "projects" | "skills" | "research" | "backup"
  >("personal");

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(editedData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("データをエクスポートしました");
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setEditedData(imported);
        toast.success("データをインポートしました");
      } catch (error) {
        toast.error("ファイルの読み込みに失敗しました");
      }
    };
    reader.readAsText(file);
  };

  const handleCopyToClipboard = () => {
    const dataStr = JSON.stringify(editedData, null, 2);
    navigator.clipboard.writeText(dataStr).then(() => {
      toast.success("データをクリップボードにコピーしました");
    }).catch(() => {
      toast.error("コピーに失敗しました");
    });
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const imported = JSON.parse(text);
      setEditedData(imported);
      toast.success("クリップボードからデータを復元しました");
    } catch (error) {
      toast.error("クリップボードからの読み込みに失敗しました");
    }
  };

  const tabs = [
    { id: "personal" as const, label: "個人情報" },
    { id: "projects" as const, label: "プロジェクト" },
    { id: "skills" as const, label: "スキル・資格" },
    { id: "research" as const, label: "研究" },
    { id: "backup" as const, label: "バックアップ" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-background border-l border-border shadow-2xl overflow-y-auto">
        <div className="sticky top-0 z-10 bg-background border-b border-border p-8">
          <div className="flex items-center justify-between mb-8">
            <h2>ポートォリオ編集</h2>
            <button
              onClick={onClose}
              className="p-2 hover:opacity-60 transition-opacity"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontSize: "var(--text-sm)" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 space-y-8">
          {activeTab === "personal" && (
            <PersonalSection
              data={editedData.personal}
              onChange={(personal) =>
                setEditedData({ ...editedData, personal })
              }
            />
          )}
          {activeTab === "projects" && (
            <ProjectsSection
              data={editedData.projects}
              onChange={(projects) =>
                setEditedData({ ...editedData, projects })
              }
            />
          )}
          {activeTab === "skills" && (
            <SkillsSection
              data={editedData.skills}
              onChange={(skills) => setEditedData({ ...editedData, skills })}
            />
          )}
          {activeTab === "research" && (
            <ResearchSection
              data={editedData.research}
              onChange={(research) =>
                setEditedData({ ...editedData, research })
              }
            />
          )}
          {activeTab === "backup" && (
            <BackupSection
              onExport={handleExport}
              onImport={handleImport}
              onCopy={handleCopyToClipboard}
              onPaste={handlePasteFromClipboard}
            />
          )}
        </div>

        <div className="sticky bottom-0 bg-background border-t border-border p-8 flex gap-4">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            保存
          </Button>
          <Button onClick={onClose} variant="outline" className="flex-1">
            キャンセル
          </Button>
        </div>
      </div>
    </div>
  );
}

function PersonalSection({
  data,
  onChange,
}: {
  data: PortfolioData["personal"];
  onChange: (data: PortfolioData["personal"]) => void;
}) {
  const handleHeroImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...data, heroImage: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-sm">名前（日本語）</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className="w-full px-4 py-2 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">名前（英語）</label>
        <input
          type="text"
          value={data.nameEn}
          onChange={(e) => onChange({ ...data, nameEn: e.target.value })}
          className="w-full px-4 py-2 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">肩書き</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
          className="w-full px-4 py-2 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">キャッチフレーズ</label>
        <textarea
          value={data.catchphrase}
          onChange={(e) => onChange({ ...data, catchphrase: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          className="w-full px-4 py-2 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">Email（大学用アドレス）</label>
        <input
          type="email"
          value={data.email2}
          onChange={(e) => onChange({ ...data, email2: e.target.value })}
          className="w-full px-4 py-2 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">GitHub URL</label>
        <input
          type="url"
          value={data.github}
          onChange={(e) => onChange({ ...data, github: e.target.value })}
          className="w-full px-4 py-2 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">Hero画像</label>
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleHeroImageUpload(file);
              }
            }}
            className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm file:mr-4 file:py-1 file:px-3 file:rounded-sm file:border-0 file:text-sm file:bg-primary file:text-primary-foreground hover:file:opacity-80"
          />
          {data.heroImage && (
            <div className="relative w-full h-48 bg-secondary rounded-sm overflow-hidden">
              <img
                src={data.heroImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection({
  data,
  onChange,
}: {
  data: PortfolioData["projects"];
  onChange: (data: PortfolioData["projects"]) => void;
}) {
  const addProject = () => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        title: "新規プロジェクト",
        description: "プロジェクトの説明",
        tags: [],
        metrics: "",
        githubUrl: "",
        imageUrl: "",
      },
    ]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, updates: Partial<typeof data[0]>) => {
    onChange(data.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateProject(id, { imageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <Button onClick={addProject} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        プロジェクトを追加
      </Button>
      {data.map((project, index) => (
        <div
          key={project.id}
          className="p-4 bg-secondary border border-border rounded-lg space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">プロジェクト {index + 1}</h4>
            <button
              onClick={() => removeProject(project.id)}
              className="p-2 hover:bg-destructive/10 rounded-sm transition-colors"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </button>
          </div>
          <div>
            <label className="block mb-2 text-xs">タイトル</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) =>
                updateProject(project.id, { title: e.target.value })
              }
              className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs">説明</label>
            <textarea
              value={project.description}
              onChange={(e) =>
                updateProject(project.id, { description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs">
              タグ（カンマ区切り）
            </label>
            <input
              type="text"
              value={project.tags.join(", ")}
              onChange={(e) =>
                updateProject(project.id, {
                  tags: e.target.value.split(",").map((t) => t.trim()),
                })
              }
              className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs">成果指標</label>
            <input
              type="text"
              value={project.metrics}
              onChange={(e) =>
                updateProject(project.id, { metrics: e.target.value })
              }
              className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs">GitHub URL</label>
            <input
              type="url"
              value={project.githubUrl}
              onChange={(e) =>
                updateProject(project.id, { githubUrl: e.target.value })
              }
              className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              placeholder="https://github.com/username/project"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs">画像</label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(project.id, file);
                  }
                }}
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm file:mr-4 file:py-1 file:px-3 file:rounded-sm file:border-0 file:text-sm file:bg-primary file:text-primary-foreground hover:file:opacity-80"
              />
              {project.imageUrl && (
                <div className="relative w-full h-32 bg-secondary rounded-sm overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsSection({
  data,
  onChange,
}: {
  data: PortfolioData["skills"];
  onChange: (data: PortfolioData["skills"]) => void;
}) {
  // スキルカテゴリー管理
  const addSkillCategory = () => {
    onChange({
      ...data,
      skills: [
        ...data.skills,
        {
          id: Date.now().toString(),
          title: "新規カテゴリー",
          icon: "code",
          iconBg: "bg-blue-100 dark:bg-blue-900/30",
          iconColor: "text-blue-600 dark:text-blue-400",
          items: [],
        },
      ],
    });
  };

  const removeSkillCategory = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((s) => s.id !== id),
    });
  };

  const updateSkillCategory = (
    id: string,
    updates: Partial<typeof data.skills[0]>
  ) => {
    onChange({
      ...data,
      skills: data.skills.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    });
  };

  // 資格管理
  const addCertification = () => {
    onChange({
      ...data,
      certifications: [
        ...data.certifications,
        {
          id: Date.now().toString(),
          name: "新規資格",
          issuer: "発行機関",
          date: "2024-01",
        },
      ],
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((c) => c.id !== id),
    });
  };

  const updateCertification = (
    id: string,
    updates: Partial<typeof data.certifications[0]>
  ) => {
    onChange({
      ...data,
      certifications: data.certifications.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    });
  };

  // 実績管理
  const addAchievement = () => {
    onChange({
      ...data,
      achievements: [
        ...data.achievements,
        {
          id: Date.now().toString(),
          title: "新規実績",
          description: "実績の説明",
        },
      ],
    });
  };

  const removeAchievement = (id: string) => {
    onChange({
      ...data,
      achievements: data.achievements.filter((a) => a.id !== id),
    });
  };

  const updateAchievement = (
    id: string,
    updates: Partial<typeof data.achievements[0]>
  ) => {
    onChange({
      ...data,
      achievements: data.achievements.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    });
  };

  return (
    <div className="space-y-8">
      {/* 技術スタック */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">技術スタック</h4>
          <Button onClick={addSkillCategory} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            追加
          </Button>
        </div>
        {data.skills.map((category, index) => (
          <div
            key={category.id}
            className="mb-4 p-4 bg-secondary border border-border rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">テゴリー {index + 1}</h4>
              <button
                onClick={() => removeSkillCategory(category.id)}
                className="p-2 hover:bg-destructive/10 rounded-sm transition-colors"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
            <div>
              <label className="block mb-2 text-xs">カテゴリー名</label>
              <input
                type="text"
                value={category.title}
                onChange={(e) =>
                  updateSkillCategory(category.id, { title: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs">
                アイコン (code, database, cloud, smartphone, palette, gitBranch, terminal)
              </label>
              <input
                type="text"
                value={category.icon}
                onChange={(e) =>
                  updateSkillCategory(category.id, { icon: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs">
                項目（カンマ区切り）
              </label>
              <input
                type="text"
                value={category.items.join(", ")}
                onChange={(e) =>
                  updateSkillCategory(category.id, {
                    items: e.target.value.split(",").map((t) => t.trim()),
                  })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 資格 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">保有資格</h4>
          <Button onClick={addCertification} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            追加
          </Button>
        </div>
        {data.certifications.map((cert, index) => (
          <div
            key={cert.id}
            className="mb-4 p-4 bg-secondary border border-border rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">資格 {index + 1}</h4>
              <button
                onClick={() => removeCertification(cert.id)}
                className="p-2 hover:bg-destructive/10 rounded-sm transition-colors"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
            <div>
              <label className="block mb-2 text-xs">資格名</label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) =>
                  updateCertification(cert.id, { name: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs">発行機関</label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) =>
                  updateCertification(cert.id, { issuer: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs">取得日</label>
              <input
                type="text"
                value={cert.date}
                onChange={(e) =>
                  updateCertification(cert.id, { date: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 実績 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">実績・受賞歴</h4>
          <Button onClick={addAchievement} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            追加
          </Button>
        </div>
        {data.achievements.map((achievement, index) => (
          <div
            key={achievement.id}
            className="mb-4 p-4 bg-secondary border border-border rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">実績 {index + 1}</h4>
              <button
                onClick={() => removeAchievement(achievement.id)}
                className="p-2 hover:bg-destructive/10 rounded-sm transition-colors"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
            <div>
              <label className="block mb-2 text-xs">タイトル</label>
              <input
                type="text"
                value={achievement.title}
                onChange={(e) =>
                  updateAchievement(achievement.id, { title: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs">説明</label>
              <textarea
                value={achievement.description}
                onChange={(e) =>
                  updateAchievement(achievement.id, {
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResearchSection({
  data,
  onChange,
}: {
  data: PortfolioData["research"];
  onChange: (data: PortfolioData["research"]) => void;
}) {
  const addPublication = () => {
    onChange({
      ...data,
      publications: [
        ...data.publications,
        {
          id: Date.now().toString(),
          title: "新規論文",
          venue: "学会名",
          authors: "著者名",
          url: "#",
        },
      ],
    });
  };

  const removePublication = (id: string) => {
    onChange({
      ...data,
      publications: data.publications.filter((p) => p.id !== id),
    });
  };

  const updatePublication = (
    id: string,
    updates: Partial<typeof data.publications[0]>
  ) => {
    onChange({
      ...data,
      publications: data.publications.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    });
  };

  // 処理フロー管理
  const addFlow = () => {
    onChange({
      ...data,
      details: {
        ...data.details,
        flows: [
          ...data.details.flows,
          {
            id: Date.now().toString(),
            step: "新規ステップ",
            description: "説明を入力",
          },
        ],
      },
    });
  };

  const removeFlow = (id: string) => {
    onChange({
      ...data,
      details: {
        ...data.details,
        flows: data.details.flows.filter((f) => f.id !== id),
      },
    });
  };

  const updateFlow = (
    id: string,
    updates: Partial<typeof data.details.flows[0]>
  ) => {
    onChange({
      ...data,
      details: {
        ...data.details,
        flows: data.details.flows.map((f) =>
          f.id === id ? { ...f, ...updates } : f
        ),
      },
    });
  };

  // 結果管理
  const addResult = () => {
    onChange({
      ...data,
      details: {
        ...data.details,
        results: [
          ...data.details.results,
          {
            id: Date.now().toString(),
            metric: "新規指標",
            value: "値",
          },
        ],
      },
    });
  };

  const removeResult = (id: string) => {
    onChange({
      ...data,
      details: {
        ...data.details,
        results: data.details.results.filter((r) => r.id !== id),
      },
    });
  };

  const updateResult = (
    id: string,
    updates: Partial<typeof data.details.results[0]>
  ) => {
    onChange({
      ...data,
      details: {
        ...data.details,
        results: data.details.results.map((r) =>
          r.id === id ? { ...r, ...updates } : r
        ),
      },
    });
  };

  // 再現手順管理
  const addReproduction = () => {
    onChange({
      ...data,
      details: {
        ...data.details,
        reproduction: [
          ...data.details.reproduction,
          {
            id: Date.now().toString(),
            step: "新規ステップ",
            description: "説明を入力",
          },
        ],
      },
    });
  };

  const removeReproduction = (id: string) => {
    onChange({
      ...data,
      details: {
        ...data.details,
        reproduction: data.details.reproduction.filter((r) => r.id !== id),
      },
    });
  };

  const updateReproduction = (
    id: string,
    updates: Partial<typeof data.details.reproduction[0]>
  ) => {
    onChange({
      ...data,
      details: {
        ...data.details,
        reproduction: data.details.reproduction.map((r) =>
          r.id === id ? { ...r, ...updates } : r
        ),
      },
    });
  };

  // 結果画像のアップロード
  const handleResultImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...data, resultImageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block mb-2 text-sm">研究テーマのタイトル</label>
        <input
          type="text"
          value={data.overviewTitle || ""}
          onChange={(e) => onChange({ ...data, overviewTitle: e.target.value })}
          className="w-full px-4 py-2 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="例: 機械学習での評価"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm">研究概要</label>
        <textarea
          value={data.overview}
          onChange={(e) => onChange({ ...data, overview: e.target.value })}
          rows={6}
          className="w-full px-4 py-2 bg-secondary border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* 結果画像 */}
      <div>
        <label className="block mb-2 text-sm">結果画像</label>
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleResultImageUpload(file);
              }
            }}
            className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm file:mr-4 file:py-1 file:px-3 file:rounded-sm file:border-0 file:text-sm file:bg-primary file:text-primary-foreground hover:file:opacity-80"
          />
          {data.resultImageUrl && (
            <div className="relative w-full h-48 bg-secondary rounded-sm overflow-hidden">
              <img
                src={data.resultImageUrl}
                alt="研究結果"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* 処理フロー */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">処理フロー</h4>
          <Button onClick={addFlow} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            追加
          </Button>
        </div>
        {data.details.flows.map((flow, index) => (
          <div
            key={flow.id}
            className="mb-4 p-4 bg-secondary border border-border rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">ステップ {index + 1}</h4>
              <button
                onClick={() => removeFlow(flow.id)}
                className="p-2 hover:bg-destructive/10 rounded-sm transition-colors"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
            <div>
              <label className="block mb-2 text-xs">ステップ名</label>
              <input
                type="text"
                value={flow.step}
                onChange={(e) =>
                  updateFlow(flow.id, { step: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs">説明</label>
              <textarea
                value={flow.description}
                onChange={(e) =>
                  updateFlow(flow.id, { description: e.target.value })
                }
                rows={2}
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 結果 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">結果</h4>
          <Button onClick={addResult} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            追加
          </Button>
        </div>
        {data.details.results.map((result, index) => (
          <div
            key={result.id}
            className="mb-4 p-4 bg-secondary border border-border rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">指標 {index + 1}</h4>
              <button
                onClick={() => removeResult(result.id)}
                className="p-2 hover:bg-destructive/10 rounded-sm transition-colors"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
            <div>
              <label className="block mb-2 text-xs">指標名</label>
              <input
                type="text"
                value={result.metric}
                onChange={(e) =>
                  updateResult(result.id, { metric: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs">値</label>
              <input
                type="text"
                value={result.value}
                onChange={(e) =>
                  updateResult(result.id, { value: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 再現手順 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">再現手順</h4>
          <Button onClick={addReproduction} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            追加
          </Button>
        </div>
        {data.details.reproduction.map((step, index) => (
          <div
            key={step.id}
            className="mb-4 p-4 bg-secondary border border-border rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">手順 {index + 1}</h4>
              <button
                onClick={() => removeReproduction(step.id)}
                className="p-2 hover:bg-destructive/10 rounded-sm transition-colors"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
            <div>
              <label className="block mb-2 text-xs">手順名</label>
              <input
                type="text"
                value={step.step}
                onChange={(e) =>
                  updateReproduction(step.id, { step: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs">説明</label>
              <textarea
                value={step.description}
                onChange={(e) =>
                  updateReproduction(step.id, { description: e.target.value })
                }
                rows={2}
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 発表・論文 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">発表・論文</h4>
          <Button onClick={addPublication} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            追加
          </Button>
        </div>
        {data.publications.map((pub, index) => (
          <div
            key={pub.id}
            className="mb-4 p-4 bg-secondary border border-border rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">論文 {index + 1}</h4>
              <button
                onClick={() => removePublication(pub.id)}
                className="p-2 hover:bg-destructive/10 rounded-sm transition-colors"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
            <div>
              <label className="block mb-2 text-xs">タイトル</label>
              <input
                type="text"
                value={pub.title}
                onChange={(e) =>
                  updatePublication(pub.id, { title: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs">学会・論文誌</label>
              <input
                type="text"
                value={pub.venue}
                onChange={(e) =>
                  updatePublication(pub.id, { venue: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs">著者</label>
              <input
                type="text"
                value={pub.authors}
                onChange={(e) =>
                  updatePublication(pub.id, { authors: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs">URL</label>
              <input
                type="url"
                value={pub.url}
                onChange={(e) =>
                  updatePublication(pub.id, { url: e.target.value })
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BackupSection({
  onExport,
  onImport,
  onCopy,
  onPaste,
}: {
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCopy: () => void;
  onPaste: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h4 className="font-medium mb-2 text-yellow-900 dark:text-yellow-100">⚠️ 重要</h4>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          アプリ再起動時にデータが消えてしまうため、編集後は必ずバックアップを取ってください。
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-3">ファイルでバックアップ</h4>
          <div className="flex flex-col gap-2">
            <Button onClick={onExport} variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              JSONファイルとしてダウンロード
            </Button>
            <label className="w-full">
              <input
                type="file"
                accept="application/json"
                onChange={onImport}
                className="hidden"
                id="import-file"
              />
              <div className="cursor-pointer w-full px-4 py-2 bg-secondary border border-border rounded-sm hover:bg-secondary/80 transition-colors text-sm flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                JSONファイルから復元
              </div>
            </label>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="font-medium mb-3">クリップボードでバックアップ</h4>
          <div className="flex flex-col gap-2">
            <Button onClick={onCopy} variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              クリップボードにコピー
            </Button>
            <Button onClick={onPaste} variant="outline" className="w-full justify-start">
              <Upload className="w-4 h-4 mr-2" />
              クリップボードから復元
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            コピーしたデータをテキストファイルなどに保存しておくと、次回起動時に復元できます。
          </p>
        </div>
      </div>
    </div>
  );
}