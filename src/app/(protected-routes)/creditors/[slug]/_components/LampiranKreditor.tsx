import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Attachment, Creditor } from "@prisma/client"
import { Section } from "./Section"
import { Checkbox } from "@/components/ui/checkbox"

type TagihanKreditorProps = {
    creditor: Creditor & {attachments:Attachment[]}
}

function LampiranKreditor({creditor}:TagihanKreditorProps) {
  return (
    <Section title="Lampiran">
    {creditor.attachments.length < 1 ? (
        <p>Creditor doesn&apos;t have any attachments</p>
    ) : (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">
                        No
                    </TableHead>
                    <TableHead className="min-w-[200px]">
                        Nama Lampiran
                    </TableHead>
                    <TableHead className="w-[100px] text-center">
                        Ready
                    </TableHead>
                    <TableHead className="min-w-[300px]">
                        Deskripsi
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {creditor.attachments.map(
                    (
                        { nama, deskripsi, ready, id },
                        idx
                    ) => (
                        <TableRow key={id}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell className="font-medium">
                                {nama}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center mr-4">
                                    <Checkbox
                                        disabled
                                        checked={ready}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <p>
                                    {deskripsi ? (
                                        deskripsi
                                    ) : (
                                        <span className="ml-2">
                                            -
                                        </span>
                                    )}
                                </p>
                            </TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    )}
</Section>  )
}

export default LampiranKreditor