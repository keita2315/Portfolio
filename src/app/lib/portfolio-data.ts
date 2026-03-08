export interface PortfolioData {
  personal: {
    name: string;
    nameEn: string;
    title: string;
    catchphrase: string;
    email: string;
    email2: string;
    github: string;
    twitter: string;
    heroImage: string;
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    tags: string[];
    metrics: string;
    imageUrl: string;
    githubUrl: string;
  }>;
  research: {
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
  skills: {
    skills: Array<{
      id: string;
      title: string;
      icon: string;
      iconBg: string;
      iconColor: string;
      items: string[];
    }>;
    certifications: Array<{
      id: string;
      name: string;
      issuer: string;
      date: string;
    }>;
    achievements: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  experience: Array<{
    id: string;
    period: string;
    title: string;
    company: string;
    description: string;
    achievements: string[];
  }>;
}

export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: "鈴木 敬達",
    nameEn: "Keitatsu Suzuki",
    title: "SIT M1",
    catchphrase:
      "LiDAR点群処理と姿勢推定を専門とし、エッジデバイス（Jetson）での高速化に取り組んでいます",
    email: "keitatsu.s0315@gmail.com",
    email2: "af22028@shibaura-it.ac.jp",
    github: "https://github.com/keita2315",
    twitter: "",
    heroImage: "",
  },
  projects: [
    {
      id: "1",
      title: "リアルタイムLiDAR点群処理システム",
      description:
        "自動運転向けに、LiDARセンサーからの点群データをリアルタイムで処理し、物体検出と追跡を行うシステムを開発。Jetson AGX Xavierで動作。",
      tags: ["Python", "Open3D", "CUDA", "Jetson", "ROS"],
      metrics: "処理速度: 30fps、検出精度: 95.3%",
      imageUrl:
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
      githubUrl: "https://github.com/yourusername/realtime-lidar-processing",
    },
    {
      id: "2",
      title: "3D姿勢推定パイプライン",
      description:
        "深層学習とICPIterative Closest Point）を組み合わせた高精度な3D姿勢推定パイプライン。産業用ロボットのピッキングに応用。",
      tags: ["PyTorch", "Open3D", "NumPy", "Docker"],
      metrics: "回転誤差: 2.1°、平行移動誤差: 3.5mm",
      imageUrl:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
      githubUrl: "https://github.com/yourusername/3d-pose-estimation",
    },
    {
      id: "3",
      title: "点群セグメンテーションツール",
      description:
        "大規模な点群データを効率的にセグメンテーションするツール。建設現場のデジタルツイン作成に活用。",
      tags: ["Python", "Open3D", "scikit-learn", "FastAPI"],
      metrics: "処理時間: 10M点を15秒、mIoU: 87.6%",
      imageUrl:
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
      githubUrl: "https://github.com/yourusername/point-cloud-segmentation",
    },
    {
      id: "4",
      title: "エッジデバイス最適化フレームワーク",
      description:
        "TensorRTとCUDAを活用し、深層学習モデルをJetsonデバイス上で高速に動作させ���フレームワークを開発。",
      tags: ["CUDA", "TensorRT", "C++", "Python", "Jetson"],
      metrics: "推論速度: 5倍高速化、消費電力: 30%削減",
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      githubUrl: "https://github.com/yourusername/edge-device-optimization",
    },
  ],
  research: {
    overview:
      "ランダムフォレストの5分類で全体精度により、5人の書道家と成立済を、演者と音色での評価。前係送数の3装委をひつてもらったところ、87.03％の正解率を得ることができた。",
    overviewTitle: "機械学習での評価",
    resultImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    details: {
      flows: [
        {
          id: "1",
          step: "点群取得",
          description: "LiDARセンサーから3D点群データを取得",
        },
        {
          id: "2",
          step: "前処理",
          description: "ノイズ除去、ダウンサンプリング、正規化",
        },
        {
          id: "3",
          step: "特徴抽出",
          description: "深層学習モデルによる特徴量の抽出",
        },
        {
          id: "4",
          step: "姿勢推定",
          description: "ICPアルゴリズムによる精密な姿勢推定",
        },
        {
          id: "5",
          step: "後処理",
          description: "カルマンフィルタによる時系列平滑化",
        },
      ],
      results: [
        {
          id: "1",
          metric: "回転誤差",
          value: "2.1°（従来手法: 5.3°）",
        },
        {
          id: "2",
          metric: "平行移動誤差",
          value: "3.5mm（従来手法: 8.2mm）",
        },
        {
          id: "3",
          metric: "処理速度",
          value: "30fps（Jetson AGX Xavier）",
        },
        {
          id: "4",
          metric: "消費電力",
          value: "15W（従来手法: 45W）",
        },
      ],
      reproduction: [
        {
          id: "1",
          step: "環境構築",
          description: "CUDA 11.8、PyTorch 2.0、Open3D 0.17をインストール",
        },
        {
          id: "2",
          step: "データセット準備",
          description: "ModelNet40データセットをダウロードし前処理",
        },
        {
          id: "3",
          step: "学習",
          description: "python train.py --epochs 100 --batch_size 32",
        },
        {
          id: "4",
          step: "評価",
          description: "python evaluate.py --model checkpoint.pth",
        },
        {
          id: "5",
          step: "Jetsonへデプロイ",
          description: "TensorRTで最適化し、Jetson上で実行",
        },
      ],
    },
    publications: [
      {
        id: "1",
        title:
          "Real-time 3D Pose Estimation on Edge Devices using LiDAR Point Clouds",
        venue: "International Conference on Computer Vision (ICCV) 2024",
        authors: "Yamada, T., et al.",
        url: "#",
      },
      {
        id: "2",
        title: "Efficient Point Cloud Segmentation for Industrial Applications",
        venue:
          "IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI) 2023",
        authors: "Yamada, T., et al.",
        url: "#",
      },
    ],
  },
  skills: {
    skills: [
      {
        id: "1",
        title: "Frontend",
        icon: "code",
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-600 dark:text-blue-400",
        items: ["React", "TypeScript", "Tailwind CSS", "HTML/CSS"],
      },
      {
        id: "2",
        title: "Backend",
        icon: "database",
        iconBg: "bg-green-100 dark:bg-green-900/30",
        iconColor: "text-green-600 dark:text-green-400",
        items: ["Node.js", "Python", "Flask"],
      },
      {
        id: "3",
        title: "Cloud & DevOps",
        icon: "cloud",
        iconBg: "bg-purple-100 dark:bg-purple-900/30",
        iconColor: "text-purple-600 dark:text-purple-400",
        items: ["studying..."],
      },
      {
        id: "4",
        title: "Mobile",
        icon: "smartphone",
        iconBg: "bg-orange-100 dark:bg-orange-900/30",
        iconColor: "text-orange-600 dark:text-orange-400",
        items: ["studying..."],
      },
      {
        id: "5",
        title: "Design",
        icon: "palette",
        iconBg: "bg-pink-100 dark:bg-pink-900/30",
        iconColor: "text-pink-600 dark:text-pink-400",
        items: ["Figma"],
      },
      {
        id: "6",
        title: "Version Control",
        icon: "gitBranch",
        iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        items: ["Git", "GitHub"],
      },
      {
        id: "7",
        title: "Tools",
        icon: "terminal",
        iconBg: "bg-gray-100 dark:bg-gray-800",
        iconColor: "text-gray-700 dark:text-gray-300",
        items: ["VS Code", "Antigravity"],
      },
      {
        id: "8",
        title: "Languages",
        icon: "code",
        iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
        iconColor: "text-yellow-700 dark:text-yellow-500",
        items: ["JavaScript", "TypeScript", "HTML", "Python"],
      },
    ],
    certifications: [
      {
        id: "1",
        name: "応用情報技術者試験",
        issuer: "IPA（情報処理推進機構）",
        date: "2023-06",
      },
      {
        id: "2",
        name: "TOEIC 900点",
        issuer: "IIBC",
        date: "2023-09",
      },
    ],
    achievements: [
      {
        id: "1",
        title: "ハッカソン優勝",
        description: "全国学生ハッカソン2023で最優賞を受賞",
      },
      {
        id: "2",
        title: "オープンソースコントリビューション",
        description: "人気OSSプロジクトへの複数のプルリクエストがマージ",
      },
    ],
  },
  experience: [
    {
      id: "1",
      period: "2023.04 - 現在",
      title: "コンピュータビジョンエンジニア",
      company: "株式会社テックビジョン",
      description:
        "自動運��システムの開発チームで、LiDAR点群処理とセンサーフュージョンを担当。リアルタイム物体検出アルゴリズムの開発と最適化を実施。",
      achievements: [
        "処理速度を従来比2倍に高化",
        "検出精度を8%向上",
        "Jetson AGX Orinへの移植完了",
      ],
    },
    {
      id: "2",
      period: "2021.04 - 2023.03",
      title: "研究開発エンジニア",
      company: "ロボティクス研究所",
      description:
        "産業用ロボットのビンピッキングシステムを開発。3D姿勢推定とグリップポイント検出のアルゴリズムを実装。",
      achievements: [
        "姿勢推定精度を15%向上",
        "処理時間を300ms以内に短縮",
        "特許出願1件",
      ],
    },
    {
      id: "3",
      period: "2019.04 - 2021.03",
      title: "修士課程",
      company: "東京大学大学院 情報理工学系研究科",
      description:
        "ンピュータビジョンと機械習を攻。LiDAR点群からの3D物体検出に関する研究を実施。",
      achievements: [
        "国際会議ICCV 2020で発表",
        "査読付き論文2本採択",
        "Best Student Paper Award受賞",
      ],
    },
    {
      id: "4",
      period: "2015.04 - 2019.03",
      title: "学士課程",
      company: "東京大学 工学部 電気電子工学科",
      description:
        "電気電子工学を学び、画像処理とコンピュータビジョンに興味を持つ。卒業研究では深層学習を用いた画像認識を研究。",
      achievements: ["学科首席で卒業", "学部長賞受賞"],
    },
  ],
};