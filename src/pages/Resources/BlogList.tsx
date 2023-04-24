import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import { Header } from '@/components/Header'

const categoryData = [
  {
    id: 'rdma',
    label: 'rdma',
  },
  {
    id: 'xline',
    label: 'Xline',
  },
  {
    id: 'rust',
    label: 'Rust',
  },
]

const timeData = [
  {
    id: 999999,
    label: 'ALL',
  },
  {
    id: 1,
    label: 'Last 1 Month',
  },
  {
    id: 6,
    label: 'Last 6 Months',
  },
  {
    id: 12,
    label: 'Last 1 Year',
  },
]

interface SortItemProps {
  isActive: boolean
}

const Heading1 = styled.div`
  font-weight: 700;
  font-size: 30px;
  line-height: 33px;
`
const Heading2 = styled.div`
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 24.75px;
  line-height: 26.4px;
`
const Heading4 = styled.div`
  margin-bottom: 32px;
  font-weight: 600;
  font-size: 18px;
  line-height: 16.5px;
`
const DefaultHeading1 = styled(Heading1)`
  text-align: center;
`
const PrimaryHeading1 = styled(Heading1)`
  margin-bottom: 48px;
  color: #7680dd;
`
const SmallText = styled.div`
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 13.5px;
  line-height: 22.2px;
`
const Cover = styled.img`
  display: block;
  margin-inline: auto;
  width: 60%;
  margin-top: 24px;
`
const ViewWrapper = styled.div`
  padding-top: 128px;
  color: #42424a;
`
const ViewContainer = styled.div`
  display: flex;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-inline: 128px;
`
const Sidebar = styled.div`
  position: sticky;
  top: calc(128px + 32px);
  left: 0;
`
const SortSection = styled.div`
  margin-bottom: 48px;
`
const SortItem = styled.div<SortItemProps>`
  width: 200px;
  margin-bottom: 16px;
  padding-block: 4px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22.2px;
  text-align: center;
  background: ${({ isActive }) => (isActive ? '#D9DBEF' : 'white')};
  border: 1px solid #d9dbef;
  border-radius: 16px;
`
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-grow: 1;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`
const Card = styled.div`
  width: 46%;
  height: min-content;
  margin-bottom: 48px;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.160784);
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`
const SidebarContainer = styled.div`
  flex-shrink: 0;
  width: 250px;
  margin-right: 32px;
`

const blogs = import.meta.glob('@/blogs/*/index.md')
// console.log(blogs)

const BlogList: React.FC = () => {
  const [data, setData] = useState<typeof import('*.md')[]>([])
  const [currentData, setCurrentData] = useState<typeof import('*.md')[]>([])
  const [category, setCategory] = useState<string[]>([])
  const [time, setTime] = useState<number>(999999)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all(Object.keys(blogs).map(path => blogs[path]())).then(res => {
      // @ts-ignore
      setData(res)
      // @ts-ignore
      setCurrentData(res)
    })
  }, [])

  function haveSame(arr1: string[], arr2: string[]) {
    const set = new Set(arr1)
    // console.log(set)
    console.log(arr2.some(item => set.has(item)))
    return arr2.some(item => set.has(item))
  }

  useEffect(() => {
    const timeSorted = data.filter(md => {
      const today = moment()
      const date = moment(md.metadata.date)
      const interval = today.diff(date, 'months')
      if (interval <= time) {
        return true
      } else {
        return false
      }
    })
    if (category.length === 0) {
      const categorySorted = timeSorted
      console.log(categorySorted)
      setCurrentData(categorySorted)
    } else {
      const categorySorted = timeSorted.filter(item =>
        haveSame(category, item.metadata.tags),
      )
      console.log(categorySorted)
      setCurrentData(categorySorted)
    }

    // // console.log(time)
    // const _now = new Date()
    // const now = moment(_now).format('YYYY-MM-DD')
    // const zqa = moment(now).diff(moment(data[2]?.metadata.date), 'months')
    // // if (category.length === 0 && time === 999999) {
    // //   setCurrentData(data)
    // // } else {
    // const temp = data.filter(item => {
    //   const date1 = moment(now)
    //   const date2 = moment(item.metadata.date)
    //   const diff = date1.diff(date2, 'months')
    //   console.log(diff)
    //   if (diff <= Number(time)) {
    //     return true
    //   } else {
    //     return false
    //   }
    // })
    // const _data = temp.filter(item => haveSame(item.metadata.tags, category))
    // setCurrentData(_data)
    // }
  }, [category, time])

  useEffect(() => {
    // console.log(data)
    // console.log(currentData)
  }, [data])

  return (
    <ViewWrapper>
      <Header theme="dark" activeId="resources" />
      <DefaultHeading1>Blog</DefaultHeading1>
      <ViewContainer>
        <SidebarContainer>
          <Sidebar>
            <PrimaryHeading1>Sort</PrimaryHeading1>
            <SortSection>
              <Heading4>Category</Heading4>
              {categoryData.map(({ id, label }) => (
                <SortItem
                  key={id}
                  isActive={category.includes(id)}
                  onClick={() => {
                    if (!category.includes(id)) {
                      setCategory([...category, id])
                    } else {
                      setCategory(category.filter(_id => _id !== id))
                    }
                  }}
                >
                  {label}
                </SortItem>
              ))}
            </SortSection>
            <SortSection>
              <Heading4>Time</Heading4>
              {timeData.map(({ id, label }) => (
                <SortItem
                  key={id}
                  isActive={id === time}
                  onClick={() => setTime(id)}
                >
                  {label}
                </SortItem>
              ))}
            </SortSection>
          </Sidebar>
        </SidebarContainer>
        <Content>
          {currentData.length === 0 ? (
            <Heading2>No match results</Heading2>
          ) : (
            currentData.map(item => {
              return (
                <Card
                  key={item.metadata.title}
                  onClick={() => {
                    navigate(
                      `${item.metadata.date}-${item.metadata.title
                        .split(' ')
                        .join('-')}`,
                    )
                  }}
                >
                  <Heading2>{item.metadata.title}</Heading2>
                  <SmallText>{item.metadata.description}</SmallText>
                  <Cover src={item.assetURLs[0]} alt="cover" />
                </Card>
              )
            })
          )}
        </Content>
      </ViewContainer>
    </ViewWrapper>
  )
}

export default BlogList
