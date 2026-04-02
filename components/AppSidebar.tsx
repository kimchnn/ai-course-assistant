"use client";

import Link from "next/link";
import { Home, BookOpen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { AddCourseModal } from "./AddCourseModal";

type Course = { id: string; name: string };

export default function AppSidebar() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(setCourses);
  }, []);

  async function handleDeleteCourse() {
    if (!courseToDelete) return;
    await fetch(`/api/courses?id=${courseToDelete.id}`, { method: 'DELETE' });
    setCourses(prev => prev.filter(c => c.id !== courseToDelete.id));
    setCourseToDelete(null);
    router.push('/');
  }

  async function handleCreateCourse(courseName: string) {
    const trimmedName = courseName.trim();
    if (!trimmedName) return;

    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmedName }),
    });

    const course = await res.json();
    setCourses(prev => [...prev, course]);
    router.push(`/course/${encodeURIComponent(course.name.toLowerCase().replace(/\s+/g, ''))}`);
  }

  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="border-b px-4 py-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold tracking-tight">
            AI Course Assistant
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Main
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="rounded-xl">
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Courses
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {courses.map((course) => (
                <SidebarMenuItem key={course.id} className="group/item flex items-center">
                  <SidebarMenuButton asChild className="rounded-xl flex-1">
                    <Link href={`/course/${course.name.toLowerCase().replace(/\s+/g, '')}`}>
                      <BookOpen className="h-4 w-4" />
                      <span>{course.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <button
                    onClick={() => setCourseToDelete(course)}
                    className="invisible group-hover/item:visible ml-1 rounded p-1 text-gray-400 hover:text-red-500"
                    title="Delete course"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem className="mt-2">
                <AddCourseModal onCreateCourse={handleCreateCourse} />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Dialog open={!!courseToDelete} onOpenChange={(open) => !open && setCourseToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove course</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove <strong>{courseToDelete?.name}</strong>? This will also delete all uploaded materials and embeddings for this course.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCourseToDelete(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
}
