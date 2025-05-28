'use client'
import React, { CSSProperties } from 'react'

import {
    Cell,
    ColumnDef,
    Header,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { makeData, Person } from './../investment_funds/_components/makeData';

// needed for table body level scope DnD setup
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    type DragEndEvent,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable'

// needed for row & cell level scope DnD setup
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const DraggableTableHeader = ({
    header,
}: {
    header: Header<Person, unknown>
}) => {
    const { attributes, isDragging, listeners, setNodeRef, transform } =
        useSortable({
            id: header.column.id,
        })

    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition: 'width transform 0.2s ease-in-out',
        whiteSpace: 'nowrap',
        width: header.column.getSize(),
        zIndex: isDragging ? 1 : 0,
    }

    return (
        <th colSpan={header.colSpan} ref={setNodeRef} style={style}>
            <button {...attributes} {...listeners}>
            {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </button>
            
        </th>

        
    )
}

const DragAlongCell = ({ cell }: { cell: Cell<Person, unknown> }) => {
    const { isDragging, setNodeRef, transform } = useSortable({
        id: cell.column.id,
    })

    const style: CSSProperties = {
        opacity: isDragging ? 0.8 : 1,
        position: 'relative',
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        transition: 'width transform 0.2s ease-in-out',
        width: cell.column.getSize(),
        zIndex: isDragging ? 1 : 0,
    }

    return (
        <td style={style} ref={setNodeRef}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
    )
}

export default function App() {
    const columns = React.useMemo<ColumnDef<Person>[]>(
        () => [
          {
            accessorKey: 'nameFund',
            header: 'Fund Name',
            id: 'nameFund',
            size: 200,
          },
          {
            accessorKey: 'unitCount',
            header: 'Unit Count',
            id: 'unitCount',
            size: 100,
          },
          {
            accessorKey: 'profitPerUnit',
            header: 'Profit/Unit',
            id: 'profitPerUnit',
            size: 130,
          },
          {
            accessorKey: 'netAssetValue',
            header: 'Net Asset Value',
            id: 'netAssetValue',
            size: 160,
          },
          {
            accessorKey: 'monstatisticalPriceth',
            header: 'Statistical Price',
            id: 'monstatisticalPriceth',
            size: 160,
          },
          {
            accessorKey: 'cancellationPrice',
            header: 'Cancellation Price',
            id: 'cancellationPrice',
            size: 150,
          },
          {
            accessorKey: 'issuancePrice',
            header: 'Issuance Price',
            id: 'issuancePrice',
            size: 130,
          },
          {
            accessorKey: 'dailyAlpha',
            header: 'Daily Alpha',
            id: 'dailyAlpha',
            size: 120,
          },
          {
            accessorKey: 'weeklyAlpha',
            header: 'Weekly Alpha',
            id: 'weeklyAlpha',
            size: 120,
          },
          {
            accessorKey: 'monthlyAlpha',
            header: 'Monthly Alpha',
            id: 'monthlyAlpha',
            size: 130,
          },
          {
            accessorKey: 'quarterlyAlpha',
            header: 'Quarterly Alpha',
            id: 'quarterlyAlpha',
            size: 140,
          },
          {
            accessorKey: 'dailyReturn',
            header: 'Daily Return',
            id: 'dailyReturn',
            size: 120,
          },
          {
            accessorKey: 'weeklyReturn',
            header: 'Weekly Return',
            id: 'weeklyReturn',
            size: 130,
          },
          {
            accessorKey: 'monthlyReturn',
            header: 'Monthly Return',
            id: 'monthlyReturn',
            size: 130,
            meta: {group: ''},
          },
          {
            accessorKey: 'quarterlyReturn',
            header: 'Quarterly Return',
            id: 'quarterlyReturn',
            size: 140,
          },
          {
            accessorKey: 'yearlyReturn',
            header: 'Yearly Return',
            id: 'yearlyReturn',
            size: 130,
          },
          {
            accessorKey: 'progress',
            header: 'Progress',
            id: 'progress',
            size: 120,
          },
          {
            accessorKey: 'startDate',
            header: 'Start Date',
            id: 'startDate',
            size: 160,
            cell: info => new Date(info.getValue<number>()).toLocaleDateString(),
          },
          {
            accessorKey: 'investmentMethod',
            header: 'Investment Method',
            id: 'investmentMethod',
            size: 150,
          },
          {
            accessorKey: 'logo',
            header: 'Logo',
            id: 'logo',
            size: 100,
            cell: info => <img src={info.getValue<string>()} alt="Logo" width={30} height={30} />,
          },
        ],
        []
      );
    const [data, setData] = React.useState(() => makeData(20))
    const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
        columns.map(c => c.id!)
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            columnOrder,
        },
        onColumnOrderChange: setColumnOrder,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })

    // reorder columns after drag & drop
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            setColumnOrder(columnOrder => {
                const oldIndex = columnOrder.indexOf(active.id as string)
                const newIndex = columnOrder.indexOf(over.id as string)
                return arrayMove(columnOrder, oldIndex, newIndex) //this is just a splice util
            })
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    )

    return (
        // NOTE: This provider creates div elements, so don't nest inside of <table> elements
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <div className="p-2">
                <div className="h-4" />
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                <SortableContext
                                    items={columnOrder.slice(1)}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    {headerGroup.headers.map(header => (
                                        <DraggableTableHeader key={header.id} header={header} />
                                    ))}
                                </SortableContext>
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <SortableContext
                                        key={cell.id}
                                        items={columnOrder.slice(1)}
                                        strategy={horizontalListSortingStrategy}
                                    >
                                        <DragAlongCell key={cell.id} cell={cell} />
                                    </SortableContext>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DndContext>
    )
}