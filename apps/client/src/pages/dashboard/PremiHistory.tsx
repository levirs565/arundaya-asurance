import * as React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@client/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@client/components/ui/dialog"
  import { Input } from "@client/components/ui/input"
  import { Label } from "@client/components/ui/label"

function showDialog(){
    return (
        <Dialog>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                        Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                        Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function PremiHistory(){
    return (
        <div>
            <Card >
                <CardHeader>
                    <CardTitle>Tanggal: </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="container">
                        <h1>Status</h1>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}