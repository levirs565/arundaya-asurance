import { useEmployeeClaimAssigned } from "@client/api/employee-claim";
import { Button } from "@client/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@client/components/ui/card";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function ClaimItem({ data }: { data: any }) {
    return <Card>
        <CardHeader>
            <CardTitle>{data.type}</CardTitle>
            <CardDescription>{data.username} - {format(data.date, "dd MMMM yyyy")}</CardDescription>
        </CardHeader>
        <CardFooter>
            <Button asChild>
                <Link to={`./${data.id}`} >
                    Review
                </Link>
            </Button>
        </CardFooter>
    </Card>
}

export function ClaimAssignedList() {
    const { data } = useEmployeeClaimAssigned();

    return <div className="space-y-2">
        {data && data.list.map((item: any) => <ClaimItem key={item.id} data={item}/>)}
    </div>
}