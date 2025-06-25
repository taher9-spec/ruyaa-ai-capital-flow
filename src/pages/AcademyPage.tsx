import React, { useState, useEffect } from "react";
import Lesson from "@/components/academy/InteractiveLessonCard";
import Footer from "@/components/Footer";
import AcademyHero from "@/components/academy/AcademyHero";
import VideoPlayerSection from "@/components/academy/VideoPlayerSection";
import CourseCompletionCard from "@/components/academy/CourseCompletionCard";
import TradingCTA from "@/components/academy/TradingCTA";
import CourseCurriculum from "@/components/CourseCurriculum";
import CourseProgress from "@/components/CourseProgress";
import QuizModal from "@/components/academy/QuizModal";
import AIStatsCard from "@/components/academy/AIStatsCard";
import {
  useCourseData,
  useLessonsData,
  useUserProgress,
} from "@/hooks/useCourseData";
import { useAuthState } from "@/hooks/chat/useAuthState";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import FuturisticBackground from "@/components/FuturisticBackground";
import ParticleBackground from "@/components/ParticleBackground";
import type { Tables } from "@/integrations/supabase/types";

type Lesson = Tables<"video_lessons">;

const AcademyPage = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { session, userId } = useAuthState();

  const { courses, coursesLoading } = useCourseData();
  const currentCourse = courses?.[0]; // Get the first (main) course

  const { lessons, lessonsLoading } = useLessonsData(currentCourse?.id || "");
  const { progress, updateProgress } = useUserProgress(
    userId,
    currentCourse?.id || "",
  );

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [videoKey, setVideoKey] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizNumber, setCurrentQuizNumber] = useState(0);

  // Set initial lesson and completed lessons from progress
  useEffect(() => {
    if (lessons && lessons.length > 0 && !selectedLesson) {
      setSelectedLesson(lessons[0]);
    }
    if (progress?.completed_lessons) {
      setCompletedLessons(progress.completed_lessons);
    }
  }, [lessons, progress, selectedLesson]);

  const handleLessonSelect = (lesson: Lesson) => {
    console.log("Selecting lesson:", lesson.title);
    setSelectedLesson(lesson);
    setVideoKey((prev) => prev + 1);
  };

  const markLessonComplete = async (lessonId: string, showToast = true) => {
    if (!completedLessons.includes(lessonId) && lessons) {
      const newCompletedLessons = [...completedLessons, lessonId];
      const progressPercentage =
        (newCompletedLessons.length / lessons.length) * 100;

      setCompletedLessons(newCompletedLessons);

      // Check if we should show a quiz (after every 5 lessons)
      if (
        newCompletedLessons.length % 5 === 0 &&
        newCompletedLessons.length < lessons.length
      ) {
        setCurrentQuizNumber(Math.floor(newCompletedLessons.length / 5) - 1);
        setShowQuiz(true);
      }

      if (userId) {
        try {
          await updateProgress.mutateAsync({
            completedLessons: newCompletedLessons,
            progressPercentage: Math.round(progressPercentage),
          });

          if (showToast) {
            const lessonTitle = isArabic
              ? selectedLesson?.title_ar
              : selectedLesson?.title;
            toast.success(
              isArabic
                ? `تم إكمال الدرس: ${lessonTitle}`
                : `Lesson completed: ${lessonTitle}`,
            );
          }

          // If course is completed, show celebration
          if (progressPercentage === 100) {
            toast.success(
              isArabic
                ? "🎉 تهانينا! لقد أكملت الدورة!"
                : "🎉 Congratulations! You completed the course!",
            );
          }
        } catch (error) {
          console.error("Error updating progress:", error);
          toast.error(isArabic ? "خطأ في حفظ التقدم" : "Error saving progress");
          setCompletedLessons(completedLessons);
        }
      }
    }
  };

  const handleVideoEnd = () => {
    console.log("Video ended for lesson:", selectedLesson?.title);
    if (selectedLesson && !completedLessons.includes(selectedLesson.id)) {
      markLessonComplete(selectedLesson.id, true);
    }
  };

  const handleManualComplete = () => {
    if (selectedLesson) {
      markLessonComplete(selectedLesson.id, true);
    }
  };

  const handleQuizComplete = (score: number) => {
    const percentage = lessons ? (score / 3) * 100 : 0; // Assuming 3 questions per quiz
    toast.success(
      isArabic
        ? `🎯 اختبار مكتمل! النتيجة: ${Math.round(percentage)}%`
        : `🎯 Quiz completed! Score: ${Math.round(percentage)}%`,
    );
    setShowQuiz(false);
  };

  const progressPercentage = lessons
    ? (completedLessons.length / lessons.length) * 100
    : 0;

  if (coursesLoading || lessonsLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D]" dir={isArabic ? "rtl" : "ltr"}>
        <div className="pt-32 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-2 border-green/30 border-t-green mx-auto"></div>
              <div className="absolute inset-0 rounded-full bg-green/10 animate-pulse"></div>
            </div>
            <p className="text-white text-lg font-medium">
              {isArabic ? "جاري تحميل الأكاديمية..." : "Loading Academy..."}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {isArabic ? "يرجى الانتظار قليلاً" : "Please wait a moment"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <FuturisticBackground />
      <ParticleBackground />

      <div className="min-h-screen bg-[#0D0D0D]" dir={isArabic ? "rtl" : "ltr"}>
        <main className="pt-32 pb-20">
          {/* Hero Section */}
          <AcademyHero currentCourse={currentCourse} lessons={lessons} />

          {/* Course Progress */}
          <section className="max-w-7xl mx-auto px-6 mb-12">
            <CourseProgress
              completedLessons={completedLessons.length}
              totalLessons={lessons?.length || 0}
              progressPercentage={progressPercentage}
            />
          </section>

          {/* Main Course Content */}
          <section className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Video/Interactive Player */}
              <div className="lg:col-span-2">
                <VideoPlayerSection
                  selectedLesson={selectedLesson}
                  completedLessons={completedLessons}
                  videoKey={videoKey}
                  onVideoEnd={handleVideoEnd}
                  onManualComplete={handleManualComplete}
                />

                {/* Course Completion CTA */}
                <CourseCompletionCard progressPercentage={progressPercentage} />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* AI Stats Card */}
                <AIStatsCard />

                {/* Course Playlist */}
                {lessons && (
                  <CourseCurriculum
                    lessons={lessons}
                    selectedLesson={selectedLesson}
                    completedLessons={completedLessons}
                    onLessonSelect={handleLessonSelect}
                    isLoading={lessonsLoading}
                  />
                )}

                {/* Start Trading CTA */}
                <TradingCTA />
              </div>
            </div>
          </section>
        </main>

        {/* Quiz Modal */}
        <QuizModal
          isOpen={showQuiz}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
          quizNumber={currentQuizNumber}
        />

        <Footer />
      </div>
    </div>
  );
};

export default AcademyPage;
