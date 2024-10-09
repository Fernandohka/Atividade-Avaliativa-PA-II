import { ROUTES } from "@/app/constants/routes";
import Link from "next/link";

interface IMenu {
    op1: string,
    op2: string,
    op3: string,
}

const Menu = ({op1, op2, op3}: IMenu) => {
    return(
        <nav className="flex justify-center items-center gap-5 bg-slate-300 p-1">
          <Link href={ROUTES.firstPage}><p className="text-center">{op1}</p></Link>
          <Link href={ROUTES.secondPage}><p className="text-center">{op2}</p></Link>
          <Link href={ROUTES.thirdPage}><p className="text-center">{op3}</p></Link>
        </nav>
    )
}

export default Menu;