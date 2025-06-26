'use client'

import { useEffect, useState } from 'react'
import { DataTable } from 'mantine-datatable'
import { Loader } from '@mantine/core'
import { supabase } from '@/lib/supabaseClient'
import './booklist.css';

type Book = {
  id: number
  created_at: string
  title: string
  author: string
  category: string
  status: string
  issued_to?: string
  issued_on?: string
}


export default function Home() {
  const [data, setData] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1)
  const pageSize = 30

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredData = data.filter(
  (book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('Books').select('*')

      if (error) {
        console.error('Supabase fetch error:', error)
      } else {
        const books = data as Book[]
        setData(books)

        const totalPages = Math.ceil(books.length / pageSize)
        if (page > totalPages && totalPages > 0) {
        setPage(1)
      }
      }

      setLoading(false)
    }

    fetchBooks()
  }, [page])


  return (
  <div className="page-container">
    <div className="top-section">
      {/* optional space or header */}
    </div>

    <div className="booklist-wrapper">
      <div className="booklist-title">
      <h1>BOOKS LIST</h1>
       <input
        type="text"
        placeholder="Search books..."
        className="booklist-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="datatable-container">
          <DataTable
            records={filteredData.slice((page - 1) * pageSize, page * pageSize)}
            columns={[
                            {
              accessor: 'select',
              title: (
                <input
                  type="checkbox"
                  checked={selectedIds.length === data.length}
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked ? data.map((record) => record.id) : []
                    )
                  }
                />
              ),
              width: 40,
              render: (record) => (
                <input
                  type="checkbox"
                  checked={selectedIds.includes(record.id)}
                  onChange={() => handleSelect(record.id)}
                />
              ),
            },
              { accessor: 'title', title: 'Title' },
              { accessor: 'author', title: 'Author' },
              { accessor: 'status', title: 'Status' },
              { accessor: 'issued_to', title: 'Issued To' },
              { accessor: 'issued_on', title: 'Issued On' },
            ]}
            totalRecords={filteredData.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            highlightOnHover
          />
        </div>
      )}
    </div>
    </div>
);
}
