import { Link } from "react-router-dom";
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
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Report {
  id: number;
  Chat: {
    id: number;
    IsReported: boolean;
    createdAt: string;
  };
  reason: string;
  reportee: {
    Profile: {};
    country: string;
    createdAt: string;
    email: string;
    id: number;
  };
  reporter: {
    Profile: {};
    country: string;
    createdAt: string;
    email: string;
    id: number;
  };
}

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function Admin() {
  const [reportedArr, setReportedArr] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // setIsLoggedIn(false);
  };

  useEffect(() => {
    const getReportedUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_HOST}:${
            import.meta.env.VITE_SERVER_PORT
          }/admin`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const { data } = response;
        setReportedArr(data);
      } catch (error) {}
    };
    getReportedUser();
    console.log(reportedArr);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="pb-3.5">
          {/* <h1 className="text-6xl font-bold pb-3.5">Admin</h1> */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ChatId</TableHead>
                <TableHead>신고자</TableHead>
                <TableHead>피신고자</TableHead>
                <TableHead className="text-right">이유</TableHead>
              </TableRow>
            </TableHeader>
            <TableCaption>신고 목록</TableCaption>
            <TableBody>
              {reportedArr.map((report: Report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">
                    {report.Chat.id}
                  </TableCell>
                  <TableCell>{report.reporter.id}</TableCell>
                  <TableCell>{report.reportee.id}</TableCell>
                  <TableCell className="text-right">{report.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <footer className="flex flex-col items-center bg-zinc-50 text-center text-surface dark:bg-neutral-700 dark:text-white">
        <div className="container pt-9">
          <div className="mb-6 flex justify-center space-x-2">
            <Link
              to="/admin"
              type="button"
              className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
              data-twe-ripple-init
            >
              <span className="[&>svg]:h-5 [&>svg]:w-5">Reported</span>
            </Link>

            <Link
              to="/admin/users"
              type="button"
              className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
              data-twe-ripple-init
            >
              <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">Users</span>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900">
                <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">Logout</span>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Do you want to logout?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-sky-300 hover:bg-sky-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-sky-300 hover:bg-sky-700">
                    <Link
                      to="/login"
                      type="button"
                      data-twe-ripple-init
                      onClick={handleLogout}
                    >
                      <span className="mx-auto [&>svg]:h-5 [&>svg]:w-5">
                        Logout
                      </span>
                    </Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="w-full bg-black/5 p-4 text-center">
          © 2024 Copyright:
          <a href="https://github.com/HoyeongJeon/GolobeTalk_FE">Hoyeong Jun</a>
        </div>
      </footer>
    </div>
  );
}
