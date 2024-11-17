import { useState } from 'react';
import { ErrorLabel } from '@client/components/label';
import { useAccountData } from "@client/api/account"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@client/components/ui/alert-dialog"
import { Label } from "@client/components/ui/label"
import { Button } from '@client/components/ui/button';
import { usePremiUpgrade } from '@client/api/premi'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@client/components/ui/dropdown-menu"
import { useUserClassList } from '@client/api/user-class';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@client/components/ui/select';

export function PremiUpgradeDialog() {
    const [open, setOpen] = useState(false);
    const { data: userData } = useAccountData();
    const { trigger, isMutating, error, reset } = usePremiUpgrade();
    const { data: classList } = useUserClassList();
    const [selectedClass, setSelectedClass] = useState<string>();

    console.log(classList);

    function onSubmit(data: any) {
        trigger({
            to: selectedClass
        } as any, {
            onSuccess: () => {
                setOpen(false);
            }
        })
    }

    if (!userData) {
        return <></>
    }
    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button>Upgrade Kelas</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Kelas saat ini: {userData.user.subscriptionClass.name}</AlertDialogTitle>

                        <AlertDialogDescription>
                            <Select value={selectedClass} onValueChange={setSelectedClass}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Daftar Kelas" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classList && classList.map((x:any) =>
                                        <SelectItem key={x.name} value={x.name}
                                        >{x.name}</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {error && <ErrorLabel text={error.message} />}
                    <AlertDialogFooter>
                        <Button onClick={() => setOpen(false)}>Batal</Button>
                        <Button onClick={ onSubmit }>Lanjut</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}