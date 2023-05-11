import { useState, useTransition } from 'react'

type SearchProps = {
  data: any[]
  searchKey: string
}

const useSearch = ({ data, searchKey }: SearchProps) => {
  const [isPending, startTransition] = useTransition()

  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter((item) => item[searchKey].toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchTerm(event.target.value)
    })
  }
  return { filteredData, handleSearch, isPending }
}
export default useSearch
