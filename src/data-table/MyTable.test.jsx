import React, {useMemo} from 'react'
import {render, cleanup, screen, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import "core-js/stable";
import "regenerator-runtime/runtime";
import MyTable from './MyTable';
const { posts } = require('./mockData')

afterEach(cleanup)

const MyTableTestComponent = props => {
  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'URL',
        accessor: 'url',
      },
      {
        Header: 'Created at',
        accessor: 'created_at',
      },
      {
        Header: 'Author',
        accessor: 'author',
      },
    ],
    []
  )

  return <MyTable columns={columns} data={props.posts} update={props.update} showDetails={() => {}} />
}

describe('Posts table', () => {
  test('renders four headings', async () => {
    render( <MyTableTestComponent posts={[]} update={() => {}} />)
    const items = await screen.findAllByRole('columnheader')
    expect(items).toHaveLength(4)
  })

  test('renders twenty posts', async () => {
    render( <MyTableTestComponent posts={posts} update={() => {}} />)
    const items = await screen.findAllByRole('row')
    expect(items).toHaveLength(21) // 20 rows + 1 header
  })

  it('update function is called on scroll', async () => {
    const onScroll = jest.fn().mockImplementation();

    render(<MyTableTestComponent posts={posts} update={onScroll} />)
    await fireEvent.scroll(window, { target: { scrollY: 300 } });

    await waitFor(() => {
      expect(onScroll).toHaveBeenCalled()
    }, 0)
  })

})