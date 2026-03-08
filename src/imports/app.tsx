import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { FeaturedProjectsSection } from "./components/FeaturedProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { ResearchSection } from "./components/ResearchSection";
import { ContactSection } from "./components/ContactSection";
import { EditorPanel } from "./components/EditorPanel";
import { PortfolioData, defaultPortfolioData } from "./lib/portfolio-data";
import { Toaster } from "sonner";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  // URLパラメータで編集モードをチェック
  const isEditMode = new URLSearchParams(window.location.search).get("edit") === "true";

  const addDebugLog = (message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleSaveData = (newData: PortfolioData) => {
    addDebugLog("保存開始");
    setData(newData);
    localStorage.setItem("portfolioData", JSON.stringify(newData));
    addDebugLog("LocalStorageに保存完了");
    // 保存確認
    const verification = localStorage.getItem("portfolioData");
    if (verification) {
      addDebugLog(`✓ 確認OK: データサイズ ${verification.length} bytes`);
    } else {
      addDebugLog("✗ エラー: 保存失敗");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onEditClick={() => setShowEditPanel(true)} name={data.personal.name} isEditMode={isEditMode} />
      <main>
        <HeroSection data={data.personal} />
        <ResearchSection data={data.research} />
        <FeaturedProjectsSection data={data.projects} />
        <SkillsSection data={data.skills} />
        <ContactSection data={data.personal} />
      </main>
      <Footer />
      
      {/* デバッグボタン - 編集モードの時だけ表示 */}
      {isEditMode && (
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="fixed bottom-24 right-8 z-40 px-4 py-2 bg-yellow-500 text-black rounded-full shadow-lg hover:bg-yellow-600 transition-colors text-sm font-medium"
        >
          🐛 Debug
        </button>
      )}
      
      {showEditPanel && (
        <EditorPanel
          data={data}
          onSave={handleSaveData}
          onClose={() => setShowEditPanel(false)}
        />
      )}
      <Toaster position="bottom-center" />
      {showDebug && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 max-h-80 overflow-y-auto border-t-4 border-yellow-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold">🐛 デバッグ情報</h3>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                onClick={() => {
                  const stored = localStorage.getItem("portfolioData");
                  if (stored) {
                    addDebugLog(`LocalStorage確認: データ存在 (${stored.length} bytes)`);
                    addDebugLog(`最初の100文字: ${stored.substring(0, 100)}...`);
                  } else {
                    addDebugLog("LocalStorage確認: データなし");
                  }
                }}
              >
                LocalStorage確認
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                onClick={() => {
                  const testKey = "test-" + Date.now();
                  const testValue = "test-value-" + Math.random();
                  localStorage.setItem(testKey, testValue);
                  const retrieved = localStorage.getItem(testKey);
                  if (retrieved === testValue) {
                    addDebugLog("✓ LocalStorageテスト: 正常動作");
                    localStorage.removeItem(testKey);
                  } else {
                    addDebugLog("✗ LocalStorageテスト: 動作不良");
                  }
                }}
              >
                動作テスト
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                onClick={() => setShowDebug(false)}
              >
                閉じる
              </button>
            </div>
          </div>
          <div className="text-xs space-y-1 font-mono">
            {debugInfo.length === 0 ? (
              <p className="text-gray-400">まだログがありません。</p>
            ) : (
              debugInfo.map((info, index) => (
                <div key={index} className="py-1 border-b border-gray-700">
                  {info}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}