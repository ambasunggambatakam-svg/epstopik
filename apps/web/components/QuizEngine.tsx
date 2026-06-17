"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@repo/ui/button";
import { ProgressBar } from "./ProgressBar";
import { Badge, getLevelFromScore } from "./Badge";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Clock,
  BarChart3,
  ArrowRight,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // index of correct option
  category: "vocabulary" | "grammar" | "listening" | "reading";
  difficulty: "easy" | "medium" | "hard";
  explanation?: string;
}

interface QuizEngineProps {
  questions: Question[];
  title?: string;
  showTimer?: boolean;
  timerMinutes?: number;
  onComplete?: (score: number, total: number, answers: number[]) => void;
}

type QuizState = "intro" | "playing" | "result";

export function QuizEngine({
  questions,
  title = "Mini Tryout EPS-TOPIK",
  showTimer = true,
  timerMinutes = 5,
  onComplete,
}: QuizEngineProps) {
  const [state, setState] = useState<QuizState>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerMinutes * 60);
  const [score, setScore] = useState(0);

  // Timer
  useEffect(() => {
    if (state !== "playing" || !showTimer) return;
    if (timeLeft <= 0) {
      handleSubmitAll();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [state, timeLeft, showTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (showFeedback) return;
      setSelected(optionIndex);
    },
    [showFeedback]
  );

  const handleConfirm = useCallback(() => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setShowFeedback(true);

      setTimeout(async () => {
        setShowFeedback(false);
        setSelected(null);
        if (current < questions.length - 1) {
          setCurrent((c) => c + 1);
        } else {
          // Calculate score
          const finalScore = newAnswers.filter(
            (a, i) => a === questions[i]?.answer
          ).length;
          setScore(finalScore);
          setState("result");
          if (onComplete) onComplete(finalScore, questions.length, newAnswers as number[]);
          
          // Save to localStorage
          try {
            localStorage.setItem(
              "epstopik_last_score",
              JSON.stringify({
                score: finalScore,
                total: questions.length,
                date: new Date().toISOString(),
              })
            );
            
            // Post to backend API
            await fetch("http://localhost:3001/api/quizzes/results", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                quizId: "cm0abc1230000abc123abc123", // Dummy tryout ID for MVP
                score: finalScore,
                total: questions.length,
              }),
            });
          } catch (e) {
            console.error("Failed to save score", e);
          }
        }
      }, 1200);
  }, [selected, answers, current, questions, onComplete]);

  const handleSubmitAll = useCallback(async () => {
    const finalScore = answers.filter(
      (a, i) => a === questions[i]?.answer
    ).length;
    setScore(finalScore);
    setState("result");
    if (onComplete) onComplete(finalScore, questions.length, answers as number[]);
    
    // Save to localStorage
    try {
      localStorage.setItem(
        "epstopik_last_score",
        JSON.stringify({
          score: finalScore,
          total: questions.length,
          date: new Date().toISOString(),
        })
      );
      
      // Post to backend API
      await fetch("http://localhost:3001/api/quizzes/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: "cm0abc1230000abc123abc123", // Dummy tryout ID for MVP
          score: finalScore,
          total: questions.length,
        }),
      });
    } catch (e) {
      console.error("Failed to save score", e);
    }
  }, [answers, questions, onComplete]);

  const handleRestart = useCallback(() => {
    setState("intro");
    setCurrent(0);
    setAnswers(new Array(questions.length).fill(null));
    setSelected(null);
    setShowFeedback(false);
    setTimeLeft(timerMinutes * 60);
    setScore(0);
  }, [questions.length, timerMinutes]);

  // === INTRO STATE ===
  if (state === "intro") {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border shadow-lg p-8 md:p-10 text-center space-y-6 animate-fade-in">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading">
              {title}
            </h2>
            <p className="text-muted-foreground">
              Jawab pertanyaan berikut untuk mengetahui level kamu
            </p>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge level="beginner" size="md" />
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
              <Clock className="h-4 w-4" />
              {timerMinutes} Menit
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
              📝 {questions.length} Soal
            </span>
          </div>
          <Button
            size="xl"
            onClick={() => setState("playing")}
            className="shadow-lg shadow-primary/20 btn-ripple"
          >
            🚀 Mulai Simulasi
          </Button>
          <p className="text-xs text-muted-foreground">
            Tanpa login • Hasil langsung
          </p>
        </div>
      </div>
    );
  }

  // === RESULT STATE ===
  if (state === "result") {
    return (
      <ResultView
        score={score}
        total={questions.length}
        questions={questions}
        answers={answers as number[]}
        onRestart={handleRestart}
      />
    );
  }

  // === PLAYING STATE ===
  const q = questions[current];
  if (!q) return null;
  const progress = ((current + 1) / questions.length) * 100;
  const isCorrect = selected === q.answer;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl border shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-6 border-b bg-gray-50/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-primary">
              Soal {current + 1} / {questions.length}
            </span>
            {showTimer && (
              <span
                className={`text-sm font-bold flex items-center gap-1.5 ${timeLeft < 60 ? "text-destructive" : "text-muted-foreground"}`}
              >
                <Clock className="h-4 w-4" />
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
          <ProgressBar value={progress} size="sm" animated={false} />
        </div>

        {/* Question */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/5 text-primary capitalize">
                {q.category}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-muted-foreground capitalize">
                {q.difficulty}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold leading-relaxed">
              {q.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              let optClass =
                "border-gray-200 hover:border-primary/50 hover:bg-primary/5";

              if (showFeedback) {
                if (i === q.answer) {
                  optClass =
                    "border-success bg-green-50 ring-2 ring-success/20";
                } else if (i === selected && !isCorrect) {
                  optClass =
                    "border-destructive bg-red-50 ring-2 ring-destructive/20";
                } else {
                  optClass = "border-gray-100 opacity-50";
                }
              } else if (selected === i) {
                optClass = "border-primary bg-primary/5 ring-2 ring-primary/20";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${optClass}`}
                >
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                      showFeedback && i === q.answer
                        ? "bg-success text-white"
                        : showFeedback && i === selected && !isCorrect
                          ? "bg-destructive text-white"
                          : selected === i
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-muted-foreground"
                    }`}
                  >
                    {showFeedback && i === q.answer ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : showFeedback && i === selected && !isCorrect ? (
                      <XCircle className="h-5 w-5" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  <span className="font-medium text-sm md:text-base">
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showFeedback && q.explanation && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 animate-fade-in">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">💡 Penjelasan:</span>{" "}
                {q.explanation}
              </p>
            </div>
          )}

          {/* Confirm Button */}
          {!showFeedback && (
            <Button
              onClick={handleConfirm}
              disabled={selected === null}
              size="lg"
              className="w-full shadow-md shadow-primary/20 btn-ripple"
            >
              {current === questions.length - 1
                ? "Submit Jawaban"
                : "Konfirmasi & Lanjut"}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== RESULT VIEW (EMBEDDED IN QUIZ ENGINE) =====
function ResultView({
  score,
  total,
  questions,
  answers,
  onRestart,
}: {
  score: number;
  total: number;
  questions: Question[];
  answers: number[];
  onRestart: () => void;
}) {
  const percentage = Math.round((score / total) * 100);
  const level = getLevelFromScore(score, total);

  // Category analysis
  const categoryScores: Record<string, { correct: number; total: number }> = {};
  questions.forEach((q, i) => {
    if (!categoryScores[q.category]) {
      categoryScores[q.category] = { correct: 0, total: 0 };
    }
    categoryScores[q.category]!.total++;
    if (answers[i] === q.answer) categoryScores[q.category]!.correct++;
  });

  // Prediction & copy based on score range
  const getScenario = () => {
    if (percentage < 50) {
      return {
        conclusion: "Kamu masih jauh dari standar kelulusan. Mulai dari dasar dan bangun kemampuan secara bertahap.",
      };
    }
    if (percentage < 80) {
      return {
        conclusion: "Kamu sudah punya dasar, tapi belum cukup untuk lulus EPS-TOPIK. Terus tingkatkan belajarmu!",
      };
    }
    return {
      conclusion: "Luar biasa! Kamu sudah sangat siap menghadapi ujian EPS-TOPIK yang sebenarnya.",
    };
  };

  const scenario = getScenario();

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* 1. HEADER - Score */}
      <div className="bg-white rounded-2xl border shadow-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold font-heading">🎯 Hasil Kamu</h2>
        <div className="text-6xl font-extrabold text-primary font-heading animate-count-up">
          {score}{" "}
          <span className="text-2xl text-muted-foreground font-normal">
            / {total}
          </span>
        </div>
        <div className="pt-2">
          <p className="text-lg font-medium text-gray-700">Level: <span className="font-bold text-primary">{level}</span></p>
        </div>
      </div>

      {/* 2. ANALYSIS */}
      <div className="bg-white rounded-2xl border shadow-lg p-8 space-y-6">
        <div className="flex items-center gap-2 font-bold text-xl font-heading mb-2">
          📊 Analisis
        </div>
        
        <div className="space-y-4">
          {Object.entries(categoryScores).map(([cat, data]) => {
            const catPercent = Math.round((data.correct / data.total) * 100);
            const isGood = catPercent >= 60;
            let statusText = "";
            if (cat === "vocabulary") statusText = "Lumayan";
            if (cat === "grammar") statusText = "Lemah";
            if (cat === "listening") statusText = "Perlu latihan";
            if (cat === "reading") statusText = "Perlu latihan";
            
            return (
              <div
                key={cat}
                className="flex items-center gap-3 text-lg"
              >
                {isGood ? (
                  <span className="text-success font-bold">✔</span>
                ) : (
                  <span className="text-destructive font-bold">❌</span>
                )}
                <span className="font-medium capitalize">{cat}:</span>
                <span className="text-gray-700">{statusText}</span>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            {scenario.conclusion}
          </p>
        </div>
      </div>

      {/* 3. CTA */}
      <div className="bg-white rounded-2xl border shadow-lg p-8 text-center space-y-6">
        <h3 className="text-xl font-bold text-gray-900">
          🔥 Mau tahu peluang kamu lulus?
        </h3>
        
        <Link 
          href="https://wa.me/xxxxxxxxxx" 
          target="_blank"
          className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:-translate-y-1"
        >
          👉 Gabung WhatsApp Channel
        </Link>
      </div>

      {/* Secondary actions */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={onRestart}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Coba Lagi
        </Button>
        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link href="/#tools">Lihat Tools Lain</Link>
        </Button>
      </div>
    </div>
  );
}
