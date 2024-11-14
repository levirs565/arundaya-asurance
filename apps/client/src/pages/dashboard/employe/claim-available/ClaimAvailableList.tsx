import { useEmployeeClaimAvailable, useEmployeeClaimTake } from "@client/api/employee-claim"
import { Button } from "@client/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@client/components/ui/card";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function ClaimItem({ data }: { data: any }) {
    const { trigger, isMutating } = useEmployeeClaimTake(data.id);

    return <Card>
        <CardHeader>
            <CardTitle>{data.type}</CardTitle>
            <CardDescription>{data.username} - {format(data.date, "dd MMMM yyyy")}</CardDescription>
        </CardHeader>
        <CardFooter>
            <Button onClick={() => trigger()} disabled={isMutating}>
                Ambil
            </Button>
        </CardFooter>
    </Card>
}

export function ClaimAvailableList() {
    const { data } = useEmployeeClaimAvailable();

    return <div className="space-y-2">
        {data && data.list.map((item: any) => <ClaimItem data={item} key={item.id} />)}
    </div>
}