import styled from 'styled-components'

const ScrollContainer = styled.main`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: rgb(179, 177, 177);
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(136, 136, 136);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(100, 100, 100);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:active {
    background: rgb(68, 68, 68);
    border-radius: 4px;
  }
`
const View = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  font-size: 48px;
  font-weight: bold;
  scroll-snap-align: center;
`
const FirstView = styled(View)`
  background: blue;
`
const SecondView = styled(View)`
  background: purple;
`
const ThirdView = styled(View)`
  background: pink;
`

const FullPageScroll: React.FC = () => {
  return (
    <ScrollContainer>
      <FirstView>First Page</FirstView>
      <SecondView>Second Page</SecondView>
      <ThirdView>Third Page</ThirdView>
    </ScrollContainer>
  )
}

export default FullPageScroll
