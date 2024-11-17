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
import { Select, SelectContent, SelectGroup, SelectItem } from '@client/components/ui/select';
import { SelectTrigger, SelectValue } from '@radix-ui/react-select';

export function PremiUpgradeDialog() {
    const [open, setOpen] = useState(false);
    const { data: userData } = useAccountData();
    const { trigger, isMutating, error, reset } = usePremiUpgrade();
    const { data: classList } = useUserClassList();
    const [selectedClass, setSelectedClass] = useState();

    console.log(classList);
    
    function onSelect(data: any) {
        trigger({
            to: selectedClass
        } as any, {
            onSuccess: () => {
                setOpen(false);
            }
        })
    }
    if(!userData) {
        return <></>
    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button>Upgrade Kelas</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Kelas saat ini: {userData.user.subscriptionClass}</AlertDialogTitle>

                    <AlertDialogDescription> 
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Daftar Kelas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                {classList && classList.map(x => 
                                    <SelectItem key={x.name} value={x.name}
                                    onSelect={selectedClass}>A</SelectItem>
                                )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}