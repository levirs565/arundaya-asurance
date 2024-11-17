import { AppBar, AppBarTitle } from "@client/components/app-bar";
import { EmployeeAddDialog } from "./EmployeeDialog";
import { Button } from "@client/components/ui/button";
import { EmployeeList } from "./EmployeeList";
import { SidebarTrigger } from "@client/components/ui/sidebar";


export function AdminEmployeePage() {
    return <div>
        <AppBar>
            <SidebarTrigger/>
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