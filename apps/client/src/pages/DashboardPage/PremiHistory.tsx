import * as React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@client/components/ui/card"

export function PremiHistory(){
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tanggal: </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="container">
                    <h1>Status</h1>
                </div>
            </CardContent>
        </Card>
    );
}