import { AppBar, AppBarTitle } from "@client/components/app-bar";
import { EmployeeAddDialog } from "./EmployeeAddDialog";
import { Button } from "@client/components/ui/button";


export function AdminEmployeePage() {
    return <div>
        <AppBar>
            <AppBarTitle>Pegawai</AppBarTitle>
            <EmployeeAddDialog>
                <Button>Tambah</Button>
            </EmployeeAddDialog>
        </AppBar>
    </div>
}