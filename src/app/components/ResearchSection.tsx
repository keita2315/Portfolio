import { SectionHeader } from "./SectionHeader";
import { motion } from "motion/react";

interface ResearchSectionProps {
  data: {
    overview: string;
    overviewTitle: string;
    resultImageUrl: string;
    details: {
      flows: Array<{
        id: string;
        step: string;
        description: string;
      }>;
      results: Array<{
        id: string;
        metric: string;
        value: string;
      }>;
      reproduction: Array<{
        id: string;
        step: string;
        description: string;
      }>;
    };
    publications: Array<{
      id: string;
      title: string;
      venue: string;
      authors: string;
      url: string;
    }>;
  };
}

export function ResearchSection({ data }: ResearchSectionProps) {
  // LocalStorageに古いデータが残っている場合のフォールバック
  const details = data.details || {
    flows: [],
    results: [],
    reproduction: [],
  };

  return (
    <section className="px-6 md:px-12 py-24 md:py-48 max-w-7xl mx-auto">
      <SectionHeader
        id="research"
        title="Research"
        description="点群処理と姿勢推定に関する研究"
      />

      <div className="space-y-24 md:space-y-48">
        {/* 研究概要 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 md:space-y-12"
        >
          <h3>研究テーマ</h3>
          <div className="space-y-6 md:space-y-8">
            {data.overviewTitle && (
              <h4>{data.overviewTitle}</h4>
            )}
            <p className="text-muted-foreground leading-relaxed max-w-4xl text-base md:text-lg">
              {data.overview}
            </p>
          </div>
        </motion.div>

        {/* 研究内容の詳細（2カラム） */}
        {(details.flows.length > 0 || details.results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12 md:space-y-16"
          >
            <h3>研究内容</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
              {/* 処理フロー図 */}
              {details.flows.length > 0 && (
                <div className="space-y-6 md:space-y-8">
                  <h4 className="text-muted-foreground">処理フロー</h4>
                  <div className="space-y-4 md:space-y-6 border-l border-border pl-6 md:pl-8">
                    {details.flows.map((flow) => (
                      <div key={flow.id} className="space-y-2 md:space-y-3">
                        <p className="text-lg md:text-xl font-medium">{flow.step}</p>
                        <p className="text-muted-foreground text-sm md:text-base">
                          {flow.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 結果図 */}
              {details.results.length > 0 && (
                <div className="space-y-6 md:space-y-8">
                  <h4 className="text-muted-foreground">結果</h4>
                  <div className="space-y-6 md:space-y-10">
                    {data.resultImageUrl ? (
                      <div className="w-full bg-white dark:bg-secondary p-4 rounded-sm border border-border flex items-center justify-center">
                        <img
                          src={data.resultImageUrl}
                          alt="研究結果"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square bg-secondary flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">
                          推定結果の可視化
                        </p>
                      </div>
                    )}
                    <div className="space-y-3 md:space-y-4">
                      {details.results.map((result) => (
                        <div key={result.id} className="flex justify-between border-b border-border pb-3">
                          <span className="text-sm">{result.metric}</span>
                          <span className="text-sm text-muted-foreground">
                            {result.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* 発表・論文 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="mb-12 md:mb-20">Publications</h3>
          <div className="space-y-12 md:space-y-16">
            {data.publications.map((pub, index) => (
              <motion.a
                key={pub.id}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group block pb-12 md:pb-16 border-b border-border last:border-0 hover:border-foreground transition-colors"
              >
                <div className="space-y-4 md:space-y-5">
                  <h4 className="group-hover:text-muted-foreground transition-colors">
                    {pub.title}
                  </h4>
                  <p className="text-muted-foreground text-base">
                    {pub.venue}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {pub.authors}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}