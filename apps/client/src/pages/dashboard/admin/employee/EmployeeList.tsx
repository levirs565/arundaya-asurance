import { useAccountListEmployee } from "@client/api/admin-employee";
import { Button } from "@client/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@client/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@client/components/ui/dropdown-menu";
import { formatTime } from "@client/lib/utils";
import { Clock, EllipsisVertical } from "lucide-react";
import { EmployeeEditDialog } from "./EmployeeDialog";
import { useRef } from "react";

function Employee({ data }: { data: any }) {
    const deleteDivRef = useRef<HTMLDivElement>(null);

    return <Card>
        <CardHeader>
            <CardTitle>{data.name}</CardTitle>
            <CardDescription>{data.id}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-row items-center gap-2">
                <Clock />
                <span>Dari {data.startDay} {formatTime(data.startTime)} sampai {data.endDay} {formatTime(data.endTime)}</span>
            </div>
        </CardContent>
        <CardFooter>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => deleteDivRef.current?.click()}>Ubah</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </CardFooter>

        <EmployeeEditDialog id={data.id}>
            <div ref={deleteDivRef}></div>
        </EmployeeEditDialog>
    </Card>
}

export function EmployeeList() {
    const { data } = useAccountListEmployee();

    return <div className="space-y-2">
        {data && data.list.map((employee: any) => <Employee key={employee.id} data={employee} />)}
    </div>
}