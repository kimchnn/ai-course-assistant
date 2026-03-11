import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddCourseModal() {
  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button 
        variant="outline"
        className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
        >+ Add Course</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form>

          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
            <DialogDescription>
              Add a new course here. Click create when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-4">
            <Label htmlFor="course-name">Course Name</Label>
            <Input
              id="course-name"
              name="name"
              placeholder="CPSC 310"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit">Create</Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  )
}