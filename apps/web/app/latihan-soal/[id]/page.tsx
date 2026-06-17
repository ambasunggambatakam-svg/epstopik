"use client";

import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { QuizEngine } from "../../../components/QuizEngine";
import type { Question } from "../../../components/QuizEngine";
import questionsData from "../../../data/questions/mini-tryout.json";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function LatihanSoalDetailPage() {
  const params = useParams();
  const id = params?.id;

  // In a real app, fetch questions by id. Here we use the mock data.
  // We can filter questions by category to simulate different latihan.
  const allQuestions = questionsData as Question[];
  const title = id === "1" ? "Latihan Reading Dasar" : "Latihan Listening Dasar";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 space-section bg-gray-50/30">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <Link href="/latihan-soal" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Kembali ke Daftar Latihan
            </Link>
          </div>

          <QuizEngine
            questions={allQuestions}
            title={title}
            showTimer={false}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
