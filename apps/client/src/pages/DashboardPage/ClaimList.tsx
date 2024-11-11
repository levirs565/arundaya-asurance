import { useClaimList } from "@client/api/claim"
import { Button } from "@client/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@client/components/ui/card"
import { Collapsible, CollapsibleContent } from "@client/components/ui/collapsible";
import { format } from "date-fns";
import { useState } from "react";

function Claim({ data }: { data: any }) {
    console.log(data);
    const [detail, setDetail] = useState(false);

    return <Card>
        <CardHeader>
            <CardTitle>{data.type}</CardTitle>
            <CardDescription>{format(data.date, "dd MMMM yyyy")}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Status : {data.state}</p>

            <Collapsible open={detail}>
                <CollapsibleContent>
                    <p>Rumah Sakit : {data.hospital}</p>
                    <p>Deskripsi : {data.description}</p>
                </CollapsibleContent>
            </Collapsible>
        </CardContent>
        <CardFooter>
            <Button onClick={() => setDetail((value) => !value)}>{detail ? "Urungkan Detail" : "Tampilkan Detail"}</Button>
        </CardFooter>
    </Card >

}

export function ClaimList() {
    const { data } = useClaimList();

    return <div className="space-y-2">
        {data && data.map((data: any) => <Claim data={data} key={data.id} />)}
    </div>
}