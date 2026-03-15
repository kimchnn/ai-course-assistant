"use client";

import Link from "next/link";
import { Home, BookOpen, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { AddCourseModal } from "./AddCourseModal";
import { courses as initialCourses } from "@/data/courses";
import { useState } from "react";
import { useRouter } from "next/navigation";


function makeCourseId(name: string) {
  return name.toLowerCase().replace(/\s+/g, "");
}

export default function AppSidebar() {
  const [courses, setCourses] = useState(initialCourses);
  const router = useRouter();

  function handleCreateCourse(courseName: string) {
  const trimmedName = courseName.trim();
  if (!trimmedName) return;

  const newCourse = {
    id: makeCourseId(trimmedName),
    name: trimmedName,
  };

  let wasAdded = false;

  setCourses((prevCourses) => {
    const alreadyExists = prevCourses.some(
      (course) => course.id === newCourse.id
    );

    if (alreadyExists) return prevCourses;

    wasAdded = true;
    return [...prevCourses, newCourse];
  });

  router.push(`/course/${newCourse.id}`);
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
                <SidebarMenuItem key={course.id}>
                  <SidebarMenuButton asChild className="rounded-xl">
                    <Link href={`/course/${course.id}`}>
                      <BookOpen className="h-4 w-4" />
                      <span>{course.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem className="mt-2">
                <AddCourseModal onCreateCourse={handleCreateCourse} />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-3">
        <p className="text-xs text-muted-foreground">
          AI-powered study tools
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}