import { AppBar, AppBarTitle } from "@client/components/app-bar";
import { EmployeeAddDialog } from "./EmployeeAddDialog";
import { Button } from "@client/components/ui/button";
import { EmployeeList } from "./EmployeeList";


export function AdminEmployeePage() {
    return <div>
        <AppBar>
            <AppBarTitle>Pegawai</AppBarTitle>
            <EmployeeAddDialog>
                <Button>Tambah</Button>
            </EmployeeAddDialog>
        </AppBar>

        <div className="p-4">
            <EmployeeList/>
        </div>
    </div>
}