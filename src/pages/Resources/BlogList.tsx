import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import { Header } from '@/components/Header'
import arrowIconUrl from '@/assets/arrow.svg'

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
  font-size: 24px;
  line-height: 33px;
`
const Heading2 = styled.div`
  max-width: 85%;
  margin-bottom: 16px;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
`
const Heading4 = styled.div`
  margin-bottom: 24px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16.5px;
`
const DefaultHeading1 = styled(Heading1)`
  height: 32px;
  text-align: center;
`
const PrimaryHeading1 = styled(Heading1)`
  margin-bottom: 26px;
  color: #7680dd;
`
const SmallText = styled.div`
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 8px;
  line-height: 1.5;
`
const Cover = styled.img`
  display: block;
  margin-inline: auto;
  width: 100%;
  margin-top: 24px;
  border-radius: 8px;
`
const ViewWrapper = styled.div`
  padding-top: 84px;
  color: #42424a;
`
const ViewContainer = styled.div`
  display: flex;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-top: 48px;
  padding-inline: 128px;
`
const Sidebar = styled.div`
  position: sticky;
  top: calc(84px + 48px + 48px);
  left: 0;
`
const SortSection = styled.div`
  margin-bottom: 32px;
`
const SortItem = styled.div<SortItemProps>`
  width: 200px;
  margin-bottom: 16px;
  padding-block: 2px;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  background: ${({ isActive }) => (isActive ? '#D9DBEF' : 'white')};
  border: 1px solid #d9dbef;
  border-radius: 16px;
`
const Content = styled.div`
  column-count: 2;
  column-gap: 32px;
  flex-grow: 1;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`
const Card = styled.div`
  position: relative;
  margin-bottom: 32px;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.160784);
  cursor: pointer;
  page-break-inside: avoid;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`
const SidebarContainer = styled.div`
  flex-shrink: 0;
  width: 250px;
  margin-right: 32px;
`
const ArrowIcon = styled.img`
  position: absolute;
  top: 36px;
  right: 36px;
  width: 18px;
  height: 18 px;
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
          {/* <div
            style={{
              background: 'red',
              width: '24%',
              height: '200px',
              marginBottom: '16px',
            }}
          ></div>
          <div
            style={{
              background: 'red',
              width: '24%',
              height: '100px',
              marginBottom: '16px',
            }}
          ></div>
          <div
            style={{
              background: 'red',
              width: '24%',
              height: '200px',
              marginBottom: '16px',
            }}
          ></div>
          <div
            style={{
              background: 'red',
              width: '24%',
              height: '200px',
              marginBottom: '16px',
            }}
          ></div>
          <div
            style={{
              background: 'red',
              width: '24%',
              height: '200px',
              marginBottom: '16px',
            }}
          ></div>
          <div
            style={{
              background: 'red',
              width: '24%',
              height: '200px',
              marginBottom: '16px',
            }}
          ></div>
          <div
            style={{
              background: 'red',
              width: '24%',
              height: '200px',
              marginBottom: '16px',
            }}
          ></div>
          <div
            style={{
              background: 'red',
              width: '24%',
              height: '200px',
              marginBottom: '16px',
            }}
          ></div> */}
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
                  <ArrowIcon src={arrowIconUrl} />
                  <Heading2>{item.metadata.title}</Heading2>
                  <SmallText>{item.metadata.description}</SmallText>
                  {item.assetURLs[0] && (
                    <Cover src={item.assetURLs[0]} alt="cover" />
                  )}
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
