import styled from 'styled-components'
import { Header } from '@/components/Header'
import imageUrl from '@/assets/Home/cover5.svg'
import gitterUrl from '@/assets/gitter.svg'
import githubUrl from '@/assets/github.svg'
import { useState } from 'react'

const TabData = [
  {
    id: 'WangHengyu',
    label: 'Hengyu Wang',
  },
  {
    id: 'LiHongyu',
    label: 'Hongyu Li',
  },
]

interface TabItemProps {
  isActive: boolean
}

const ViewWrapper = styled.div`
  height: 100vh;
  padding-top: 84px;
  color: #42424a;
`
const ViewContainer = styled.div`
  align-items: center;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: 64px;
  padding-inline: 128px;
  overflow: hidden;
`
const FirstSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 96px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`
const SecondSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 96px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 64;
  }
`
const ThirdSection = styled.div``
const FirstSectionContent = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    align-items: center;
  }
`
const Image = styled.img`
  margin-right: 64px;
  width: 300px;

  @media screen and (max-width: 1024px) {
    width: 400px;
    margin-bottom: 64px;
  }
`
const Heading1 = styled.div`
  margin-bottom: 32px;
  font-weight: 700;
  font-size: 30px;
  line-height: 33px;
`
const StyleHeading1 = styled(Heading1)`
  padding-left: 24px;
  border-left: 24px solid #7680dd;
  margin-bottom: 48px;
`
const Paragraph1 = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 22.2px;
`
const Paragraph2 = styled.div`
  font-weight: 400;
  font-size: 13.5px;
  line-height: 22.2px;
  margin-bottom: 27px;
`
const Card = styled.div`
  padding: 28px;
  width: 48%;
  border-radius: 12px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.15);

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-bottom: 32px;
  }
`
const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 27px;
`
const CardTitle = styled.div`
  height: 100%;
  margin-right: 16px;
  padding-right: 16px;
  font-weight: 600;
  font-size: 18px;
  line-height: 16.5px;
  border-right: 2px solid #000;
`
const CardIcon = styled.img`
  width: 14px;
`
const Button = styled.div`
  width: fit-content;
  margin-inline: auto 16px;
  padding: 4px 32px;
  background: linear-gradient(90deg, #767ee5, #9966cc);
  color: white;
  font-weight: 400;
  font-size: 13.5px;
  line-height: 22.2px;
  border-radius: 46.5px;
  cursor: pointer;
`
const TabContainer = styled.div`
  border-radius: 16px;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.160784);
  overflow: hidden;
`
const Tab = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  //
  height: 80px;
`
const TabItem = styled.div<TabItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: ${({ isActive }) => (isActive ? 'white' : 'inherit')};
  font-weight: 600;
  font-size: 22.5px;
  line-height: 33.3px;
  background: ${({ isActive }) => (isActive ? '#7680DD' : 'white')};
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  cursor: pointer;
`
const TabPanel = styled.div`
  padding: 64px;
  background: #d9dbef;
`
const TabPanelContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`
const TabPanelText = styled(Paragraph1)`
  width: 46%;

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-bottom: 32px;
  }
`
const HengyuWang = {
  description: [
    'Hengyu Wang is a graduate student majoring in computer science. He joined the async-rdma project because it happens to fit in his academic interest on integrating software and hardware. Guided by his community mentor, he grows with the development of the project and is invited to share his practical experience on using Rust to package RDMA on several hands-on workshops.',
    'I am having unforgettable experience with the async-rdma project. The DatenLord community is friendly and my mentor is a seasoned engineer who encourages me to verify my ideas and assumptions about the project while pay attention to the engineering discipline, which shift my perspective from a student who merely focuses on running a program to a professional engineer who cares about its maintainability and stability as well.',
  ],
  id: 'GTwhy',
  url: 'https://github.com/GTwhy',
}
const HongyuLi = {
  description: [
    'Hongyu Li is passionate about open source community and Rust, and thus joined this particular project of DatenLord to add support for Rust to be merged in the Linux kernel. With the guidance of his community mentor, he honed his skills in Rust in the process of contributing code, writing document and replying revisions to the upstream.',
    'Working with the Rust for Linux project in DatenLord is rewarding. The community is friendly and interactive. I was encouraged by my mentor to seriously weigh different options to revise even a small bug and go beyond just write code, but lines of ELEGANT codes. What I acquire in the community is not only conceptual, but practical.',
  ],
  id: 'Richard Li',
  url: 'https://github.com/Richardhongyu',
}

const ContributingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('WangHengyu')

  return (
    <ViewWrapper>
      <Header theme="dark" activeId="resources" />
      <ViewContainer>
        <FirstSection>
          <Image src={imageUrl} />
          <FirstSectionContent>
            <Heading1>Contributing is Thinking and Learning</Heading1>
            <Paragraph1>
              Open source is not merely about contributing code in Github. In
              Datenlord, however, we believe that giving is thinking and
              learning, and together with the received feedback from the virtual
              community are capable of framing trust and collaboration.
            </Paragraph1>
          </FirstSectionContent>
        </FirstSection>
        <SecondSection>
          <Card>
            <CardTitleContainer>
              <CardTitle>Join Conversation on Gitter</CardTitle>
              <CardIcon src={gitterUrl} />
            </CardTitleContainer>
            <Paragraph2>
              Join our community of experts in building the next generation of
              cloud-native, geo-distributed storage system
            </Paragraph2>
            <Button
              as="a"
              href="https://app.gitter.im/#/room/#datenlord_datenlord:gitter.im"
            >
              DatenLord Gitter Channel
            </Button>
          </Card>
          <Card>
            <CardTitleContainer>
              <CardTitle>Become A Contributor</CardTitle>
              <CardIcon src={githubUrl} />
            </CardTitleContainer>
            <Paragraph2>
              Looking for the source code, or have an idea to contribute? Join
              our open source community on GitHub.
            </Paragraph2>
            <Button as="a" href="https://github.com/datenlord">
              DatenLord on Github
            </Button>
          </Card>
        </SecondSection>
        <ThirdSection>
          <StyleHeading1>Story Spotlight</StyleHeading1>
          <TabContainer>
            <Tab>
              {TabData.map(({ id, label }) => (
                <TabItem
                  isActive={activeTab === id}
                  key={id}
                  onClick={() => setActiveTab(id)}
                >
                  {label}
                </TabItem>
              ))}
            </Tab>
            <TabPanel>
              <TabPanelContent>
                <TabPanelText>
                  {activeTab === 'WangHengyu'
                    ? HengyuWang.description[0]
                    : HongyuLi.description[0]}
                </TabPanelText>
                <TabPanelText>
                  {activeTab === 'WangHengyu'
                    ? HengyuWang.description[1]
                    : HongyuLi.description[1]}
                </TabPanelText>
              </TabPanelContent>
              {activeTab === 'WangHengyu' ? (
                <Button as="a" href={HengyuWang.url}>
                  Github ID: {HengyuWang.id}
                </Button>
              ) : (
                <Button as="a" href={HongyuLi.url}>
                  Github ID: {HongyuLi.id}
                </Button>
              )}
            </TabPanel>
          </TabContainer>
        </ThirdSection>
      </ViewContainer>
    </ViewWrapper>
  )
}

export default ContributingPage
