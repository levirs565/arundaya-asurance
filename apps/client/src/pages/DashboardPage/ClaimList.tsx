import { useClaimList } from "@client/api/claim"
import { Badge, BadgeProps } from "@client/components/ui/badge";
import { Button } from "@client/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@client/components/ui/card"
import { Collapsible, CollapsibleContent } from "@client/components/ui/collapsible";
import { format } from "date-fns";
import { Check, CircleEllipsis, FileSearch, Loader, X } from "lucide-react";
import { useState } from "react";

const claimStateMessages: Record<string, string> = {
    "NOT_ASSIGNED": 'Belum Direview',
    "ASSIGNED": 'Proses Review',
    "ACCEPTED": 'Diterima',
    "REJECTED": 'Ditolak'
}
const claimStateVarians: Record<string, BadgeProps["variant"]> = {
    "NOT_ASSIGNED": "secondary",
    "ASSIGNED": "default",
    "ACCEPTED": "default",
    "REJECTED": "destructive"
}

const claimStateIconProps = {
    className: "mr-2",
    size: 20
};
const claimStateIcons: Record<string, any> = {
    "NOT_ASSIGNED": <Loader {...claimStateIconProps} />,
    "ASSIGNED": <FileSearch {...claimStateIconProps} />,
    "ACCEPTED": <Check {...claimStateIconProps} />,
    "REJECTED": <X {...claimStateIconProps} />
}

function Claim({ data }: { data: any }) {
    const [detail, setDetail] = useState(false);

    return <Card>
        <CardHeader>
            <CardTitle>{data.type}</CardTitle>
            <CardDescription>
                {format(data.date, "dd MMMM yyyy")}
                <Badge className="ml-2" variant={claimStateVarians[data.state]}>
                    {claimStateIcons[data.state]}
                    {claimStateMessages[data.state as string]}
                </Badge>
            </CardDescription>
        </CardHeader>

        <Collapsible open={detail}>
            <CollapsibleContent asChild>
                <CardContent>
                    <p className="text-sm font-bold">Rumah Sakit</p>
                    <p>{data.hospital}</p>

                    <p className="text-sm font-bold mt-4">Deskripsi</p>
                    <p>{data.description}</p>
                </CardContent>
            </CollapsibleContent>
        </Collapsible>
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