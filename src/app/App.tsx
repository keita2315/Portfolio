import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { FeaturedProjectsSection } from "./components/FeaturedProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { ResearchSection } from "./components/ResearchSection";
import { ContactSection } from "./components/ContactSection";
import { EditorPanel } from "./components/EditorPanel";
import { PortfolioData, defaultPortfolioData } from "./lib/portfolio-data";
import { fetchPortfolioData, savePortfolioData } from "./lib/api";
import { Toaster, toast } from "sonner";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // URLパラメータで編集モードをチェック
  const isEditMode = new URLSearchParams(window.location.search).get("edit") === "true";

  const addDebugLog = (message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // 初回ロード時にSupabaseからデータを取得
  useEffect(() => {
    const loadData = async () => {
      try {
        addDebugLog("Supabaseからデータを取得中...");
        const remoteData = await fetchPortfolioData();
        
        if (remoteData) {
          setData(remoteData);
          addDebugLog("✓ Supabaseからデータを読み込みました");
        } else {
          addDebugLog("⚠ データが見つかりません。デフォルトデータを使用します");
          // デフォルトデータを初回保存
          await savePortfolioData(defaultPortfolioData);
          addDebugLog("✓ デフォルトデータをSupabaseに保存しました");
        }
      } catch (error) {
        addDebugLog(`✗ エラー: ${error}`);
        toast.error("データの読み込みに失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSaveData = async (newData: PortfolioData) => {
    try {
      addDebugLog("保存開始");
      setData(newData);
      
      await savePortfolioData(newData);
      addDebugLog("✓ Supabaseに保存完了");
      toast.success("データを保存しました");
    } catch (error) {
      addDebugLog(`✗ 保存エラー: ${error}`);
      toast.error("保存に失敗しました");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    );
  }

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
                onClick={async () => {
                  try {
                    addDebugLog("手動でデータを取得中...");
                    const remoteData = await fetchPortfolioData();
                    if (remoteData) {
                      addDebugLog(`✓ データ取得成功: ${JSON.stringify(remoteData).length} bytes`);
                    } else {
                      addDebugLog("⚠ データが見つかりません");
                    }
                  } catch (error) {
                    addDebugLog(`✗ エラー: ${error}`);
                  }
                }}
              >
                Supabase確認
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                onClick={async () => {
                  try {
                    addDebugLog("テストデータを保存中...");
                    await savePortfolioData(data);
                    addDebugLog("✓ テスト保存成功");
                  } catch (error) {
                    addDebugLog(`✗ テスト保存失敗: ${error}`);
                  }
                }}
              >
                保存テスト
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