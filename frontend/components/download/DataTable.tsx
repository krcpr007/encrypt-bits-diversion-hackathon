"use client";

import React, { useRef } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function DataTable({ data }: any) {
  console.log(data);
  return (
    <>
      <Table>
        <TableCaption>A list of Patients.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.No</TableHead>
            <TableHead>Patient Id</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead className="text-right">Download</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">
              <Button
                onClick={() => document.getElementById("open-dialog")?.click()}
              >
                Get Data
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Dialog>
        <DialogTrigger id="open-dialog" />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Download Data</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-between items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-4"
                disabled
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="username" className="text-right">
                Key
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="flex-grow"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Download</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
