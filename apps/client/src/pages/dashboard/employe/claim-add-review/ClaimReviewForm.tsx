import { useEmployeeClaimAccept, useEmployeeClaimById, useEmployeeClaimEditMessage, useEmployeeClaimReject } from "@client/api/employee-claim";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInYears, format, subYears } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Textarea } from "@client/components/ui/textarea";
import { Button } from "@client/components/ui/button";
import { ErrorLabel } from "@client/components/label";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    message: z.string().min(1)
})

function ClaimMessageForm({ data }: { data: any }) {
    const { trigger, error, reset, isMutating } = useEmployeeClaimEditMessage(data.id);

    const currentValue = useMemo(() => {
        if (!data) {
            return {
                message: ""
            }
        }

        return {
            message: data.reviewMessage
        }
    }, [data]);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: currentValue
    })

    useEffect(() => {
        form.reset(currentValue);
    }, [currentValue]);

    function onSubmit(data: any) {
        trigger(data);
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, reset)}>
            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Review</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Masukkan Review atau pesan untuk pengaju" {...field} />
                        </FormControl>
                        <FormDescription>

                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            {error && <ErrorLabel text={error.message} />}
            <Button type="submit" disabled={isMutating}>Kirim</Button>
        </form>
    </Form>
}

function ClaimAction({ id }: { id: number }) {
    const navigate = useNavigate();
    const acceptAction = useEmployeeClaimAccept(id);
    const rejectAction = useEmployeeClaimReject(id)

    const isMutating = acceptAction.isMutating || rejectAction.isMutating;
    const [error, setError] = useState<any>(null);

    return <div className="space-y-2">
        {error && <ErrorLabel text={error.message} />}
        <div className="flex flex-row gap-2">
            <Button onClick={() => {
                acceptAction.trigger(null, {
                    onSuccess: () => {
                        navigate("/dashboard/employee/claim-assigned");
                    },
                    onError: (err) => {
                        setError(err);
                    }
                })
            }} disabled={isMutating}>Terima</Button>
            <Button onClick={() => {
                rejectAction.trigger(null, {
                    onSuccess: () => {
                        navigate("/dashboard/employee/claim-assigned");
                    },
                    onError: (err) => {
                        setError(err);
                    }
                })
            }} disabled={isMutating} variant="destructive">Tolak</Button>
        </div>
    </div>
}

export function ClaimReviewForm({ id }: { id: number }) {
    const { data } = useEmployeeClaimById(id);

    if (!data) return <></>;

    return <div className="space-y-2">

        <h2 className="text-lg font-semibold">Identitas</h2>

        <p className="text-sm font-bold">Nama </p>
        <p>{data.user.name}</p>

        <p className="text-sm font-bold">Umur </p>
        <p>{differenceInYears(new Date(), new Date(data.user.birthDate))} Tahun</p>

        <p className="text-sm font-bold">Pekerjaan</p>
        <p>{data.user.job}</p>

        <p className="text-sm font-bold">Tanggal Lahir</p>
        <p>{format(data.user.birthDate, "dd MMMM yyyy")}</p>

        <p className="text-sm font-bold">Nomor Induk Kepemilikan(NIK)</p>
        <p>{data.user.nik}</p>

        <p className="text-sm font-bold">Nama Ibu</p>
        <p>{data.user.motherName}</p>

        <p className="text-sm font-bold">Pengahsilan</p>
        <p>{data.user.income}</p>

        <p className="text-sm font-bold">Kelas</p>
        <p>{data.user.subscriptionClass}</p>


        <h2 className="text-lg font-semibold pt-4">Data Klaim</h2>

        <p className="text-sm font-bold">Jenis</p>
        <p>{data.type}</p>

        <p className="text-sm font-bold">Tanggal</p>
        <p>{format(data.date, "dd MMMM yyyy")}</p>

        <p className="text-sm font-bold">Rumah Sakit</p>
        <p>{data.hospital}</p>

        <p className="text-sm font-bold mt-4">Deskripsi</p>
        <p>{data.description}</p>

        <h2 className="text-lg font-semibold pt-4">Data Review</h2>

        <ClaimMessageForm data={data} />


        <ClaimAction id={data.id} />
    </div>
}