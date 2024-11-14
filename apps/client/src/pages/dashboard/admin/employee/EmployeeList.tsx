import { useAccountListEmployee } from "@client/api/admin-employee";
import { Button } from "@client/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@client/components/ui/card";
import { formatTime } from "@client/lib/utils";
import { Clock } from "lucide-react";

function Employee({data}: {data: any}) {
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
        </CardFooter>
    </Card>
}

export function EmployeeList() {
    const { data } = useAccountListEmployee();

    return <div className="space-y-2">
        {data && data.list.map((employee: any) => <Employee key={employee.id} data={employee}/>)}
    </div>
}