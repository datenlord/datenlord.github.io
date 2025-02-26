const e="/assets/cover-70c492f6.jpeg",a="/assets/image1-9271640c.png",t="/assets/image2-a577ede8.png",s="/assets/image3-0fb3115e.png",n="/assets/image4-6bfb5e92.png",r="/assets/image5-3870a6e1.png",o="/assets/image6-3e96d8d4.png",i="/assets/image7-453329fc.png",p="/assets/image8-a695e19a.png",l="/assets/image9-9696aa07.png",d="/assets/image10-9290cbb1.png",c="/assets/image11-a23ab95a.jpeg",h="/assets/image12-57f3789d.png",m="/assets/image13-a0858a86.png",u=[e,a,t,s,n,r,o,i,p,l,d,c,h,m],g={description:"This repo implements a collection of Ethernet-related components in Bluespec SystemVerilog(BSV) for high-performance packet processing on FPGA. Specifically, this repo provides modules for generating and parsing UDP/IP/Ethernet packets. An ARP processing unit with non-blocking cache storing address information is also provided to handle MAC address resolution automatically. Beside building a standard UDP/IP/Ethernet stack, blue-ethernet adds support for RoCE(RDMA over Converged Ethernet) 1) integrate the generation and verification of ICRC(Invariant Cyclic Redundancy) in UDP/IP packet processing;  2) provide modules to handle PFC(Priority Flow Control) to realize the lossless network transmission. And finally interface conversion modules are also provided for packet generator and parser to interact with Xilinx 100G Ethernet Subsystem(CMAC).",cover:"./cover.jpeg",tags:["rdma"],date:"2023-12-22",title:"Blue Ethernet High Performance FPGA Network Packet Processing Project Overview"},f=[{label:"Intro",level:2},{label:"Directories Overview",level:2},{label:"Components",level:2},{label:"Stream Handler",level:3},{label:"UdpIpLayer",level:2},{label:"UdpIpLayerForRdma",level:3},{label:"MacLayer",level:3},{label:"ARP Processor",level:3},{label:"UdpIpEthRx",level:3},{label:"UdpIpEthTx",level:3},{label:"UdpIpArpEthRxTx",level:3},{label:"PriorityFlowControl",level:3},{label:"PfcUdpIpArpEthRxTx",level:3},{label:"Performance and Area",level:2},{label:"Get Started",level:2},{label:"Run Simulation",level:3},{label:"Run Synthesis and Implementation",level:3},{label:"Usage",level:3},{label:"Related Links",level:2}],b=`<h2 id="intro">Intro</h2>
<p>This repo implements a collection of Ethernet-related components in Bluespec SystemVerilog(BSV) for high-performance packet processing on FPGA. Specifically, this repo provides modules for generating and parsing <a href="https://en.wikipedia.org/wiki/User_Datagram_Protocol">UDP</a>/<a href="https://en.wikipedia.org/wiki/Internet_Protocol">IP</a>/<a href="https://en.wikipedia.org/wiki/Ethernet_frame">Ethernet</a> packets. An <a href="https://en.wikipedia.org/wiki/Address_Resolution_Protocol">ARP</a> processing unit with non-blocking cache storing address information is also provided to handle MAC address resolution automatically. Beside building a standard UDP/IP/Ethernet stack, blue-ethernet adds support for RoCE(RDMA over Converged Ethernet): 1) integrate the generation and verification of ICRC(Invariant Cyclic Redundancy) in UDP/IP packet processing; 2) provide modules to handle PFC(Priority Flow Control) to realize the lossless network transmission. And finally interface conversion modules are also provided for packet generator and parser to interact with <a href="https://china.xilinx.com/products/intellectual-property/cmac_usplus.html">Xilinx 100G Ethernet Subsystem</a>(CMAC).</p>
<p><img src="${e}" alt="cover"></p>
<h2 id="directories-overview">Directories Overview</h2>
<p>Some key directories of this repo are shown below:</p>
<pre><code class="hljs language-bash">├── lib               <span class="hljs-comment"># external libraries/repos</span>
│   ├── blue-crc      <span class="hljs-comment"># high-performance CRC hardware implementation</span>
│   └── blue-wrapper  <span class="hljs-comment"># BSV wrappers for generating ready-to-use Verilog interface</span>
├── scripts           <span class="hljs-comment"># scripts used to build project</span>
├── src               <span class="hljs-comment"># design source files</span>
│   └── includes      <span class="hljs-comment"># files containing some commonly-used BSV types and modules</span>
├── syn               <span class="hljs-comment"># scripts for vivado synthesis and implementation</span>
└── <span class="hljs-built_in">test</span>              <span class="hljs-comment"># source files for verification</span>
    ├── bluesim       <span class="hljs-comment"># testbenches based on bluesim</span>
    ├── cocotb        <span class="hljs-comment"># python testbenches based on cocotb</span>
    └── vivado        <span class="hljs-comment"># co-simulation with cmac using vivado</span>
</code></pre>
<p>Here is a list of some critical source files:</p>
<pre><code class="hljs language-bash">./src
├── ArpCache.bsv               <span class="hljs-comment"># Cache implementation storing MAC addresses got from ARP</span>
├── ArpProcessor.bsv           <span class="hljs-comment"># processing unit handling ARP requests and responses</span>
├── includes
│   ├── CompletionBuf.bsv
│   ├── ContentAddressMem.bsv
│   ├── EthernetTypes.bsv      <span class="hljs-comment"># numeric and struct types about protocol definition</span>
│   ├── PortConversion.bsv     <span class="hljs-comment"># interface conversion modules used to generate ready-to-use Verilog</span>
│   ├── Ports.bsv              <span class="hljs-comment"># numeric and struct types about in/output ports of modules</span>
│   ├── RFile.bsv
│   ├── StreamHandler.bsv      <span class="hljs-comment"># modules implemented for manipulating data stream</span>
│   └── Utils.bsv              <span class="hljs-comment"># utility functions and modules</span>
├── MacLayer.bsv               <span class="hljs-comment"># generator and parser for Ethernet packet</span>
├── PfcUdpIpArpEthRxTx.bsv     <span class="hljs-comment"># generator and parser for UDP/IP/Ethernet packet with PFC</span>
├── PriorityFlowControl.bsv    <span class="hljs-comment"># modules handling PFC</span>
├── UdpIpArpEthRxTx.bsv        <span class="hljs-comment"># generator and parser for UDP/IP/Ethernet packet</span>
├── UdpIpEthRx.bsv             <span class="hljs-comment"># parser for UDP/IP/Ethernet packet</span>
├── UdpIpEthTx.bsv             <span class="hljs-comment"># generator for UDP/IP/Ethernet packet</span>
├── UdpIpLayer.bsv             <span class="hljs-comment"># parser and generator for UDP/IP packet</span>
├── UdpIpLayerForRdma.bsv      <span class="hljs-comment"># parser and generator for UDP/IP packet with support for RoCE</span>
└── XilinxCmacRxTxWrapper.bsv  <span class="hljs-comment"># bridge modules between parser/generator and Xilinx CMAC</span>
</code></pre>
<h2 id="components">Components</h2>
<p>This section provides detailed descriptions of some important components implemented in blue-ethernet, including their functionality, interface and hardware architecture.</p>
<h3 id="stream-handler">Stream Handler</h3>
<p>What Ethernet-related hardware components do is basically a series of stream manipulations. The packet generator is responsible for inserting the header stream into the head of payload stream to generate complete packet stream. On the contrary, what the parser does is to extract the header stream and payload stream from packet stream. As for adding the checksum for a packet, the packet stream is passed into CRC calculator and then the output CRC value is appended to the tail of the packet stream.</p>
<p>The hardware entity corresponding to the stream we mention here is actually a group of data signals guarded by the valid-ready control signal pair. The valid signal indicates that the source component wants to transfer data. And the ready indicates that the sink is ready to receive data from source. A transfer between source and sink only happens successfully when both valid and ready are high. If the size of data to be transmitted is larger than the size of one transfer, the data needs to be fragmented and transmitted in a series of transfers.</p>
<p><img src="${a}" alt="image"></p>
<p>The most tricky and error-prone part of stream processing is about how to handle the valid-ready control signals of different streams. In BSV, the manipulation of control signals is implemented by the compiler and invisible in the grammatical level, which helps designers focus on the logic of stream processing.</p>
<p>The stream processing modules provided in blue-ethernet include:</p>
<p>Data signals used to transfer packet stream between different components are encapsulated in <strong>DataStream</strong> struct, which includes 256-bit data signal, 32-bit byte-enable signal, two Boolean signals represents whether this transfer is the last or first of a packet stream.</p>
<pre><code class="hljs language-rust">typedef <span class="hljs-number">256</span> DATA_BUS_WIDTH;
typedef TDiv#(DATA_BUS_WIDTH, <span class="hljs-number">8</span>) DATA_BUS_BYTE_WIDTH;
typedef Bit#(DATA_BUS_WIDTH) Data;
typedef Bit#(DATA_BUS_BYTE_WIDTH) ByteEn;
typedef <span class="hljs-keyword">struct</span> {
    Data data;
    ByteEn byteEn;
    Bool isFirst;
    Bool isLast;
} DataStream <span class="hljs-title function_ invoke__">deriving</span>(Bits, Bounded, <span class="hljs-built_in">Eq</span>, FShow);
</code></pre>
<ul>
<li><strong>mkAppendDataStreamHead</strong> appends one transfer in <strong>appendDataIn</strong> stream to the head of one packet in <strong>dataStreamIn</strong> stream. The endian of data from these two streams can be swapped by setting <strong>swapDataStream</strong> and <strong>swapAppendData</strong> parameters. This module is used to combine header stream and payload stream to generate complete UDP/IP/Ethernet packet.</li>
</ul>
<pre><code class="hljs language-rust">module mkAppendDataStreamHead#(
    IsSwapEndian swapDataStream,
    IsSwapEndian swapAppendData,
    PipeOut#(DataStream) dataStreamIn,
    PipeOut#(dType) appendDataIn
)(PipeOut#(DataStream));
</code></pre>
<ul>
<li><strong>mkAppendDataStreamTail</strong> works similarly with <strong>mkAppendDataStreamHead</strong> by appending one transfer in <strong>appendDataIn</strong> stream to the tail of one packet in the <strong>dataStreamIn</strong> stream. To simplify internal hardware implementation, it also needs to take in one more stream <strong>streamLengthIn</strong> which carries the length of each packet in .</li>
</ul>
<pre><code class="hljs language-rust">module mkAppendDataStreamTail#(
    IsSwapEndian swapDataStream,
    IsSwapEndian swapAppendData,
    PipeOut#(DataStream) dataStreamIn,
    PipeOut#(dType) appendDataIn,
    PipeOut#(Bit#(streamLenWidth)) streamLengthIn
)(PipeOut#(DataStream));
</code></pre>
<ul>
<li><strong>mkExtractDataStreamHead</strong> extracts the head of one packet in <strong>dataStreamIn</strong> stream to <strong>extractDataOut</strong> stream and sends the remainder packet stream to <strong>dataStreamOut</strong> stream.</li>
</ul>
<pre><code class="hljs language-rust">interface ExtractDataStream#(<span class="hljs-keyword">type</span> <span class="hljs-title class_">dType</span>);
    interface PipeOut#(dType) extractDataOut;
    interface PipeOut#(DataStream) dataStreamOut;
endinterface
module mkExtractDataStreamHead#(
    PipeOut#(DataStream) dataStreamIn
)(ExtractDataStream#(dType));
</code></pre>
<ul>
<li><strong>mkAxiStream512ToDataStream</strong> converts 512-bit AXI-Stream interface required by Xilinx CMAC IP to 256- bit <strong>DataStream</strong> used in blue-ethernet.</li>
<li><strong>mkDataStreamToAxiStream512</strong> converts 256-bit <strong>DataStream</strong> used in blue-ethernet ****to 512-bit AXI-Stream required by Xilinx CMAC IP.</li>
</ul>
<h2 id="udpiplayer">UdpIpLayer</h2>
<p>Modules in <strong>UdpIpLayer</strong> package are implemented for generating and parsing UDP/IP packet.</p>
<p>Detailed Package Description:</p>
<p>The packet generator takes in <strong>UdpIpMetaData</strong> that contains UDP/IP header information and the stream of payload and outputs complete UDP/IP packet stream. The packet parser works in the opposite way by extracting <strong>UdpIpMetaData</strong> and payload stream from UDP/IP packet stream.</p>
<pre><code class="hljs language-rust">typedef <span class="hljs-keyword">struct</span> {
    UdpLength  dataLen;   # The Length of payload data
    IpAddr     ipAddr;    # Desitnation IP address
    IpDscp     ipDscp;    # DSCP field used <span class="hljs-keyword">for</span> <span class="hljs-title class_">PFC</span>
    IpEcn      ipEcn;     # ECN field
    UdpPort    dstPort;   # Destination port number
    UdpPort    srcPort;   # Source port number
} UdpIpMetaData;
</code></pre>
<p>Signals encapsulated in <strong>UdpIpMetaData</strong> struct don’t cover all fields defined in UDP/IP header. Some fields of the header are fixed for a specific network device, which are encapsulated in <strong>UdpConfig</strong> struct and need to be configured before transmitting or receiving any packets. And some other fields are constant and hard-coded in hardware components.</p>
<pre><code class="hljs language-rust">typedef <span class="hljs-keyword">struct</span> {
    EthMacAddr macAddr;  # Source MAC address
    IpAddr     ipAddr;   # Source IP address
    IpNetMask  netMask;  # IP netmask
    IpGateWay  gateWay;  # IP gateway
} UdpConfig;
</code></pre>
<ul>
<li><strong>mkUdpIpStream</strong> generates UDP/IP packet stream by combining <strong>udpIpMetaDataIn</strong> carrying header infomation and <strong>dataStreamIn</strong> carrying payload stream. This module also takes in a function returning complete UDP/IP header, in which the value of constant fields of header are specified. The packet generation includes following steps: 1) generate UDP/IP header; 2) calculate and set the checksum field of IP header(the checksum of UDP header is unused in blue-ethernet); 3)insert the header at the head of payload stream.</li>
</ul>
<pre><code class="hljs language-rust">module mkUdpIpStream#(
    UdpConfig udpConfig,
    PipeOut#(DataStream) dataStreamIn,
    PipeOut#(UdpIpMetaData) udpIpMetaDataIn,
    function UdpIpHeader <span class="hljs-title function_ invoke__">genHeader</span>(UdpIpMetaData meta, UdpConfig udpConfig, IpID ipId)
)(PipeOut#(DataStream));
</code></pre>
<ul>
<li><strong>mkUdpIpMetaDataAndDataStream</strong> extracts <strong>udpIpMetaDataOut</strong> carrying header information and <strong>dataStreamOut</strong> carrying payload stream from input UDP/IP packet stream <strong>udpIpStreamIn</strong>. Before sending out extracted header and payload, the module needs to verify the integrity of received IP header by checksum field and throw them if the header is corrupted during transmission.</li>
</ul>
<pre><code class="hljs language-rust">interface UdpIpMetaDataAndDataStream;
    interface PipeOut#(UdpIpMetaData) udpIpMetaDataOut;
    interface PipeOut#(DataStream) dataStreamOut;
endinterface
module mkUdpIpMetaDataAndDataStream#(
    UdpConfig udpConfig,
    PipeOut#(DataStream) udpIpStreamIn,
    function UdpIpMetaData <span class="hljs-title function_ invoke__">extractMetaData</span>(UdpIpHeader hdr)
)(UdpIpMetaDataAndDataStream);
</code></pre>
<h3 id="udpiplayerforrdma">UdpIpLayerForRdma</h3>
<p>Modules in <strong>UdpIpLayerForRdma</strong> package are implemented based on <strong>UdpIpLayer</strong> with support for RoCE(RDMA over Converged Ethernet). The additional functionality added to support RoCE is generation and verification of ICRC(Invariant CRC) required for RoCE packets. The format of RoCE packet is defined as below:</p>
<p><img src="${t}" alt="image"></p>
<p>Detailed Package Description:</p>
<ul>
<li><strong>mkUdpIpStreamForRdma</strong> exposes the same interface and functionality as <strong>mkUdpIpStream</strong>. The main difference is that it appends an additional checksum to the tail of output packet stream to generate RoCE-compliant UDP/IP packet. To realize this functionality, another three components are integrated into the stream processing dataflow: (1) <strong>mkUdpIpStreamForICrcGen</strong> generates UDP/IP packet stream for CRC calculation by setting some fields of IP/UDP header and IB BTH to zero, which is required by the definition of ICRC; (2) <strong>mkCrcStream</strong> is provided in <a href="https://github.com/datenlord/blue-crc">blue-crc</a> repo and used to calculate CRC checksum of packet stream; (3) <strong>mkAppendDataStreamTail</strong> appends CRC checksum to the tail of original UDP/IP packet stream;</li>
</ul>
<p><img src="${s}" alt="image"></p>
<ul>
<li><strong>mkUdpIpMetaDataAndDataStreamForRdma</strong> is implemented based on <strong>mkUdpIpMetaDataAndDataStream</strong> with additional support for ICRC verification. To realize this additional function, the input UDP/IP packet stream is sent to <strong>mkUdpIpStreamForICrcChk</strong> and then passed to <strong>mkCrcStream</strong> to get ICRC verification result. If verification fails, the extracted payload data and header are dropped. And before extracted payload stream is sent out, it needs to pass through <strong>mkRemoveICrcFromDataStream</strong> component to remove its tail ICRC checksum.</li>
</ul>
<p><img src="${n}" alt="image"></p>
<h3 id="maclayer">MacLayer</h3>
<p>Modules in <strong>MacLayer</strong> package are implemented for generating and parsing Ethernet packet. The generator inserts Ethernet header to the head of UDP/IP packet stream to generate Ethernet packet stream. The parser extracts Ethernet header and UDP/IP packet stream from Ethernet packet stream.</p>
<p>Detailed Package Description:</p>
<p>The header information used to generate Ethernet packet is defined in <strong>MacMetaData</strong> struct.</p>
<pre><code class="hljs language-rust">typedef <span class="hljs-keyword">struct</span> {
    EthMacAddr macAddr; # Destination MAC address
    EthType    ethType; # Type of Ethernet frame
} MacMetaData <span class="hljs-title function_ invoke__">deriving</span>(Bits, <span class="hljs-built_in">Eq</span>, FShow);
</code></pre>
<p>To be noted, Ethernet packet handled in the <strong>MacLayer</strong> only covers fields outlined in the red rectangle in the figure below. Other fields are left to be processed by Xilinx CMAC IP.</p>
<p><img src="${r}" alt="image"></p>
<ul>
<li><strong>mkMacStream</strong> generates Ethernet packet stream by combining <strong>udpIpStreamIn</strong> carrying UDP/IP packet stream and <strong>macMetaDataIn</strong> carrying Ethernet header information.</li>
</ul>
<pre><code class="hljs language-rust">module mkMacStream#(
    PipeOut#(DataStream)  udpIpStreamIn,
    PipeOut#(MacMetaData) macMetaDataIn,
    UdpConfig udpConfig
)(PipeOut#(DataStream));
</code></pre>
<ul>
<li><strong>mkMacMetaDataAndUdpIpStream</strong> extracts <strong>macMetaDataOut</strong> carrying Ethernet header infomation and <strong>udpIpStreamOut</strong> carrying UDP/IP packet stream from Ethernet packet stream <strong>macStreamIn</strong>.</li>
</ul>
<pre><code class="hljs language-rust">interface MacMetaDataAndUdpIpStream;
    interface PipeOut#(MacMetaData) macMetaDataOut;
    interface PipeOut#(DataStream)  udpIpStreamOut;
endinterface

module mkMacMetaDataAndUdpIpStream#(
    PipeOut#(DataStream) macStreamIn,
    UdpConfig udpConfig
)(MacMetaDataAndUdpIpStream);
</code></pre>
<h3 id="arp-processor">ARP Processor</h3>
<p>The Address Resolution Protocol (ARP) is used for discovering MAC address associated with a given IP address. In blue-ethernet, the module <strong>mkArpProcessor</strong> is implemented for ARP processing, which integrates ARP packet generator, parser and <strong>mkArpCache</strong> module storing MAC addresses.</p>
<p>Detailed Description of mkArpCache and mkArpProcessor:</p>
<h4>mkArpCache</h4>
<p>For cache used in ARP processing, 32-bit IP address corresponds to cache address and 48-bit MAC address corresponds to cache data. The default arrangement of memory array for ARP cache is shown below, which is 4-way set-associative structure, each way contains 64 lines and each line includes 1-bit valid, 26-bit tag and 48-bit data. The total size of this default array configuration is about 1.2KB. It’s supported to change the size of memory array by setting the number of lines and ways. Based on this memory array, cache is designed to be non-blocking, support outstanding requests(multiple requests on flight) and use pseudo-LRU algorithm for cache line replacement.</p>
<p><img src="${o}" alt="image"></p>
<p>The interface definition and simplified structure diagram of <strong>mkArpCache</strong> module is shown below. The <strong>ArpCache</strong> has two subinterfaces: <strong>cacheServer</strong> handles interactions with components that MAC address resolution service; and <strong>arpClient</strong> handles interations with <strong>mkArpProcessor</strong> to initiate ARP request and get MAC address from ARP response. The basic workflow of <strong>mkArpCache</strong> module is as follows:</p>
<p>When cache receives a read request, it first searches the memory array to get all tags and data corresponding to the given IP address. Then it checks tags to see whether the data we need is stored in the cache. If cache hits, the fetched data is sent to <strong>hitBuf</strong>. Or the IP address is sent to <strong>arpReqBuf</strong> to initiate an ARP request. And when the ARP response comes back, the data and address information it carries is both written to <strong>cacheWrBuf</strong> and <strong>missHitBuf</strong> to update memory array and return cache read response.</p>
<pre><code class="hljs language-rust">interface ArpCache;
    interface Server#(CacheAddr, CacheData) cacheServer;
    interface Client#(CacheAddr,   ArpResp) arpClient;
endinterface
</code></pre>
<p><img src="${i}" alt="image"></p>
<p>The most difficult part of cache implementation is to support the feature of outstanding, that is supporting multiple read requests on flight. The problem induced by outstanding is that the response time is different for each on-flight ARP request, which means that a late request may receive its response first. So reorder mechanism is needed to guarantee correspondence between request address and response data when cache miss happens. To realize in-order response, the completion buffer <strong>respCBuf</strong> and content addressable memory <strong>missReqTab</strong> are integrated in the dataflow. The completion buffer works like FIFO with additional support for the functionality of reservation. Before actual enqueue operation, we can first reserves an order in the completion buffer. And dequeue operation follows the reserved order no matter the actual sequential order of enqueue operations. For each read request, a dequeue order is reversed in <strong>respCBuf</strong> once it’s received. And because of the ARP request can’t carry the order information, <strong>missReqTab</strong> is implemented to storing it.</p>
<h4>mkArpProcessor</h4>
<p>The module can behave as both ARP client and server. As a server, processor needs to generate ARP request if MAC address of target IP is unknown and then waits for ARP response from the target device. As a client, ARP processor receives ARP request from other devices and sends back ARP response carrying its own MAC address.</p>
<p><img src="${p}" alt="image"></p>
<pre><code class="hljs language-rust">interface ArpProcessor;
    interface PipeOut#(DataStream) arpStreamOut;
    interface PipeOut#(MacMetaData) macMetaDataOut;
    interface Put#(UdpConfig) udpConfig;
endinterface

module mkArpProcessor#(
    PipeOut#(DataStream) arpStreamIn,
    PipeOut#(UdpIpMetaData) udpIpMetaDataIn
)(ArpProcessor);
</code></pre>
<h3 id="udpipethrx">UdpIpEthRx</h3>
<p>Modules in <strong>UdpIpEthRx</strong> package are implemented for receiving and parsing UDP/IP/Ethernet packets.</p>
<p>Detailed Package Description:</p>
<ul>
<li><strong>mkGenericUdpIpEthRx</strong> extracts Ethernet header stream(<strong>macMetaDataOut</strong>), UDP/IP header stream(<strong>udpIpMetaDataOut</strong>) and payload stream(<strong>dataStreamOut</strong>) from <strong>axiStreamIn</strong> carrying Ethernet packet stream. It’s required to config the component through <strong>udpConfig</strong> interface first before receiving and parsing packets. And the module parameter <strong>isSupportRdma</strong> specifies whether or not it supports RoCE packet processing. The figure below shows the structure diagram of this module with support for RoCE enabled. If support for RoCE is disabled, the whole <strong>mkUdpIpMetaDataAndDataStreamForRdma</strong> module is replaced by <strong>mkUdpIpMetaDataAndDataStream.</strong></li>
</ul>
<pre><code class="hljs language-rust">interface UdpIpEthRx;
    interface Put#(UdpConfig) udpConfig;

    interface Put#(AxiStream512) axiStreamIn;

    interface PipeOut#(MacMetaData) macMetaDataOut;
    interface PipeOut#(UdpIpMetaData) udpIpMetaDataOut;
    interface PipeOut#(DataStream)  dataStreamOut;
endinterface

module mkGenericUdpIpEthRx#(Bool isSupportRdma)(UdpIpEthRx)
</code></pre>
<p><img src="${l}" alt="image"></p>
<ul>
<li><strong>mkGenericRawUdpIpEthRx</strong> wraps <strong>mkGenericUdpIpEthRx</strong> using modules provided in <a href="https://github.com/wengwz/blue-wrapper">blue-wrapper</a> to generate ready-to-use Verilog interface.</li>
</ul>
<h3 id="udpipethtx">UdpIpEthTx</h3>
<p>Modules in <strong>UdpIpEthTx</strong> package are implemented for generating and transmitting UDP/IP/Ethernet packets.</p>
<p>Detailed Package Description:</p>
<ul>
<li><strong>mkGenericUdpIpEthTx</strong> takes in Ethernet header stream(<strong>macMetaDataOut</strong>), UDP/IP header stream(<strong>udpIpMetaDataOut</strong>) and payload data stream(<strong>dataStreamOut</strong>), generates Ethernet packet stream and then sends it out through <strong>axiStreamOut</strong>. And the module parameter <strong>isSupportRdma</strong> specifies whether or not it supports RoCE packet processing. The figure below shows the structure of this module with support for RoCE enabled.</li>
</ul>
<pre><code class="hljs language-rust">interface UdpIpEthTx;
    interface Put#(UdpConfig) udpConfig;
    interface Put#(UdpIpMetaData) udpIpMetaDataIn;
    interface Put#(MacMetaData) macMetaDataIn;
    interface Put#(DataStream) dataStreamIn;
    interface AxiStream512PipeOut axiStreamOut;
endinterface

module mkGenericUdpIpEthTx#(Bool isSupportRdma)(UdpIpEthTx);
</code></pre>
<p><img src="${d}" alt="image10"></p>
<ul>
<li><strong>mkGenericRawUdpIpEthTx</strong>: this module wraps <strong>mkGenericUdpIpEthTx</strong> using modules provided in <a href="https://github.com/wengwz/blue-wrapper">blue-wrapper</a> to generate ready-to-use Verilog interface.</li>
</ul>
<h3 id="udpiparpethrxtx">UdpIpArpEthRxTx</h3>
<p>Modules provided in <strong>UdpIpArpEthRxTx</strong> package is designed to receive and transmit UDP/IP/Ethernet packets and handle ARP request and response at the same time.</p>
<p>Detailed Package Description:</p>
<h5>mkGenericUdpIpArpEthRxTx</h5>
<p>The module can be divided into two opposite paths of streams, including transmission path and reception path:</p>
<p>For transmission path, it takes in <strong>dataStreamInTx</strong> carrying payload stream and <strong>udpIpMetaDataIn</strong> carrying header information stream and generates <strong>axiStreamOutTx</strong> carring UDP/IP/Ethernet packet stream. There is no need to provides <strong>MacMetaData</strong> that contains Ethernet header information as <strong>mkUdpIpEthTx</strong> module, because <strong>mkArpProcessor</strong> is responsible for handling MAC address resolution and generating Ethernet header information.</p>
<p>For the reception path, it works in the opposite way by extracting <strong>dataStreamOutRx</strong> carrying payload stream and <strong>udpIpMetaDataOutRx</strong> carrying header information stream from <strong>axiStreamInRx</strong> carrying UDP/IP/Ethernet packet stream.</p>
<p>The Ethernet packet generator and parser are shared by both UDP/IP packet and ARP packet, so additional <strong>Mux</strong> and <strong>Demux</strong> are needed in the transmission and reception path for stream arbitration and distribution. The module parameter <strong>isSupportRdma</strong> specifies whether or not it supports RoCE packet processing. If support for RDMA is disabled, we only need <strong>mkUdpIpStream</strong> and <strong>mkUdpIpMetaAndDataStream</strong> in the transmision and reception path respectively.</p>
<pre><code class="hljs language-rust">interface UdpIpArpEthRxTx;
    interface Put#(UdpConfig)  udpConfig;
    <span class="hljs-comment">// Tx</span>
    interface Put#(UdpIpMetaData) udpIpMetaDataInTx;
    interface Put#(DataStream)    dataStreamInTx;
    interface AxiStream512PipeOut axiStreamOutTx;
    <span class="hljs-comment">// Rx</span>
    interface Put#(AxiStream512)   axiStreamInRx;
    interface PipeOut#(UdpIpMetaData) udpIpMetaDataOutRx;
    interface PipeOut#(DataStream)    dataStreamOutRx;
endinterface

module mkGenericUdpIpArpEthRxTx#(Bool isSupportRdma)(UdpIpArpEthRxTx);
</code></pre>
<p><img src="${c}" alt="image"></p>
<h4>mkGenericRawUdpIpArpEthRxTx</h4>
<p>The module wraps <strong>mkGenericUdpIpArpEthRxTx</strong> using modules provided in <a href="https://github.com/wengwz/blue-wrapper">blue-wrapper</a> so that it generates ready-to-use Verilog interface.</p>
<h4>mkUdpIpArpEthCmacRxTx</h4>
<p>The module integrates both <strong>mkGenericUdpIpArpEthRxTx</strong> module and <strong>mkXilinxCmacTxWrapper</strong> module. It’s designed to interact with Xilinx CMAC IP to transmits and receives UDP/IP/Ethernet packets to and from physical medium.</p>
<h3 id="priorityflowcontrol">PriorityFlowControl</h3>
<p>Modules in <strong>PriorityFlowControl</strong> package are implemented to realize mechanism of <a href="https://en.wikipedia.org/wiki/Ethernet_flow_control">priority flow control</a> to ensure lossless network transmission.</p>
<p>Detailed Package Description:</p>
<ul>
<li><strong>mkPriorityFlowControlTx</strong> takes in <strong>dataStreamInVec</strong> carrying eight channels of payload stream and <strong>udpIpMetaDataInVec</strong> carrying eight channels of header information, then performs arbitration over eight channels and outputs arbitraion result through <strong>udpIpMetaDataOut</strong> and <strong>dataStreamOut</strong>. The round robin arbitration strategy is adopted in this module to give all channels the same priority. This module is also responsible for pausing or resuming each channel according to flow control information from <strong>flowControlReqVecIn</strong>.</li>
</ul>
<pre><code class="hljs language-rust">interface PriorityFlowControlTx;
    interface Get#(UdpIpMetaData) udpIpMetaDataOut;
    interface Get#(DataStream) dataStreamOut;
endinterface

module mkPriorityFlowControlTx#(
    PipeOut#(FlowControlReqVec) flowControlReqVecIn,
    Vector#(VIRTUAL_CHANNEL_NUM, DataStreamPipeOut) dataStreamInVec,
    Vector#(VIRTUAL_CHANNEL_NUM, UdpIpMetaDataPipeOut) udpIpMetaDataInVec
)(PriorityFlowControlTx);
</code></pre>
<p><img src="${h}" alt="image"></p>
<ul>
<li><strong>mkPriorityFlowControlRx</strong> takes in <strong>udpIpMetaDataIn</strong> carrying header information stream and <strong>dataStreamIn</strong> carrying payload stream and then routes these two stream to their corresponding output channel specified by the channel index included in header information. Besides, this module needs to monitor the number of elements stored in the intermediate buffer of each channel. And when a channel’s buffer reaches its threshold, it sends out flow control request to pause packet transmission of this channel. The parameter <strong>bufPacketNum</strong> sets the maximum number of packets stored in the intermeidate buffer and <strong>maxPacketFrameNum</strong> sets the maximun number of frames in one packet. The width of each frame is 256-bit, equaling to the data width of intermediate buffer. The <strong>pfcThreshold</strong> sets the threshold number of packets stored in the buffer that triggers flow control request.</li>
</ul>
<pre><code class="hljs language-rust">interface PriorityFlowControlRx#(
    numeric <span class="hljs-keyword">type</span> <span class="hljs-title class_">bufPacketNum</span>,
    numeric <span class="hljs-keyword">type</span> <span class="hljs-title class_">maxPacketFrameNum</span>,
    numeric <span class="hljs-keyword">type</span> <span class="hljs-title class_">pfcThreshold</span>
);
    interface PipeOut#(FlowControlReqVec) flowControlReqVecOut;
    interface Vector#(VIRTUAL_CHANNEL_NUM, Get#(DataStream)) dataStreamOutVec;
    interface Vector#(VIRTUAL_CHANNEL_NUM, Get#(UdpIpMetaData)) udpIpMetaDataOutVec;
endinterface

module mkPriorityFlowControlRx#(
    DataStreamPipeOut dataStreamIn,
    UdpIpMetaDataPipeOut udpIpMetaDataIn
)(PriorityFlowControlRx#(bufPacketNum, maxPacketFrameNum, pfcThreshold));
</code></pre>
<p><img src="${m}" alt="image"></p>
<h3 id="pfcudpiparpethrxtx">PfcUdpIpArpEthRxTx</h3>
<ul>
<li>
<p><strong>mkGenericPfcUdpIpArpEthRxTx</strong> integrates <strong>mkPriorityFlowControlRx/Tx</strong> and <strong>mkGenericUdpIpArpEthRxTx</strong> to provide the functionality of generating and parsing UDP/IP/Ethernet packets while supporting priority flow control. For packet transmission, it takes eight channels of payload stream and UDP/IP header information, and outputs one UDP/IP/Ethernet packet stream. For packet reception, it takes in one UDP/IP/Ethernet packet stream and routes the extracted UDP/IP header and payload stream to one of eight output channels.</p>
</li>
<li>
<p><strong>mkPfcUdpIpArpEthCmacRxTx</strong> integrates both <strong>mkGenericPfcUdpIpArpEthRxTx</strong> module and <strong>mkXilinxCmacTxWrapper</strong> module. It’s designed to interact with Xilinx CMAC IP to transmits and receives UDP/IP/Ethernet packets to and from physical medium.</p>
</li>
</ul>
<h2 id="performance-and-area">Performance and Area</h2>
<p>The synthesis and implementation of the main module <strong>mkGenericUdpIpArpEthRxTx</strong> are performed based on <strong>Xilinx xcvu9p</strong> device using Vivado. And results show that the circuit can reach the working frequency of 500MHz and provide the peak throughput of 128Gbps. The usage of hardware resources is listed as follows:</p>
<pre><code class="hljs language-rust">CLB Logic
+----------------------------+-------+-------+------------+-----------+-------+
|          Site Type         |  Used | Fixed | Prohibited | Available | Util% |
+----------------------------+-------+-------+------------+-----------+-------+
| CLB LUTs                   | <span class="hljs-number">63886</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |   <span class="hljs-number">1182240</span> |  <span class="hljs-number">5.40</span> |
|   LUT <span class="hljs-keyword">as</span> Logic             | <span class="hljs-number">41242</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |   <span class="hljs-number">1182240</span> |  <span class="hljs-number">3.49</span> |
|   LUT <span class="hljs-keyword">as</span> Memory            | <span class="hljs-number">22644</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |    <span class="hljs-number">591840</span> |  <span class="hljs-number">3.83</span> |
|     LUT <span class="hljs-keyword">as</span> Distributed RAM | <span class="hljs-number">22644</span> |     <span class="hljs-number">0</span> |            |           |       |
|     LUT <span class="hljs-keyword">as</span> Shift Register  |     <span class="hljs-number">0</span> |     <span class="hljs-number">0</span> |            |           |       |
| CLB Registers              | <span class="hljs-number">44099</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |   <span class="hljs-number">2364480</span> |  <span class="hljs-number">1.87</span> |
|   Register <span class="hljs-keyword">as</span> Flip Flop    | <span class="hljs-number">44099</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |   <span class="hljs-number">2364480</span> |  <span class="hljs-number">1.87</span> |
|   Register <span class="hljs-keyword">as</span> Latch        |     <span class="hljs-number">0</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |   <span class="hljs-number">2364480</span> |  <span class="hljs-number">0.00</span> |
| CARRY8                     |    <span class="hljs-number">73</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |    <span class="hljs-number">147780</span> |  <span class="hljs-number">0.05</span> |
| F7 Muxes                   |   <span class="hljs-number">194</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |    <span class="hljs-number">591120</span> |  <span class="hljs-number">0.03</span> |
| F8 Muxes                   |    <span class="hljs-number">28</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |    <span class="hljs-number">295560</span> | &#x3C;<span class="hljs-number">0.01</span> |
| F9 Muxes                   |     <span class="hljs-number">0</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |    <span class="hljs-number">147780</span> |  <span class="hljs-number">0.00</span> |
+----------------------------+-------+-------+------------+-----------+-------+

BLOCKRAM
+-------------------+------+-------+------------+-----------+-------+
|     Site Type     | Used | Fixed | Prohibited | Available | Util% |
+-------------------+------+-------+------------+-----------+-------+
| Block RAM Tile    |  <span class="hljs-number">4.5</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |      <span class="hljs-number">2160</span> |  <span class="hljs-number">0.21</span> |
|   RAMB36/FIFO*    |    <span class="hljs-number">4</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |      <span class="hljs-number">2160</span> |  <span class="hljs-number">0.19</span> |
|     RAMB36E2 only |    <span class="hljs-number">4</span> |       |            |           |       |
|   RAMB18          |    <span class="hljs-number">1</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |      <span class="hljs-number">4320</span> |  <span class="hljs-number">0.02</span> |
|     RAMB18E2 only |    <span class="hljs-number">1</span> |       |            |           |       |
| URAM              |    <span class="hljs-number">0</span> |     <span class="hljs-number">0</span> |          <span class="hljs-number">0</span> |       <span class="hljs-number">960</span> |  <span class="hljs-number">0.00</span> |
+-------------------+------+-------+------------+-----------+-------+
</code></pre>
<h2 id="get-started">Get Started</h2>
<p>This section introduces how to get started with this project. Before any other steps, you first need to set up development environment referring to the script <a href="./setup.sh">setup.sh</a>. Here is a list of dependencies:</p>
<ul>
<li><a href="https://github.com/B-Lang-org/bsc">Bluespec Compiler</a></li>
<li>Docker</li>
<li>Vivado</li>
<li>Python packages: cocotb, cocotb-test, netifaces, scapy, cocotbext-axi</li>
<li>Hardware Simulator: iverilog/verilator</li>
</ul>
<p>After setting up the environment, clone this repo to a specific directory. Here we refer to this directory as BLUE_ETH:</p>
<pre><code class="hljs language-bash">git <span class="hljs-built_in">clone</span> --recursive https://github.com/wengwz/blue-ethernet.git $(BLUE_ETH)
</code></pre>
<h3 id="run-simulation">Run Simulation</h3>
<p>There are three different levels of testbenches provided in blue-ethernet:</p>
<ul>
<li>Unit Level: testbenches of this level are located in <a href="./test/bluesim">$(BLUE_ETH)/test/bluesim</a> and provide functional verification of some important subcomponents, like ArpCache, CompletionBuf and AppendDataStreamTail. To launch simulation, you can follow commands below:</li>
</ul>
<pre><code class="hljs language-bash"><span class="hljs-comment"># Specify TARGET to the name of target component</span>
<span class="hljs-built_in">cd</span> $(BLUE_ETH)/test/bluesim
make TARGET=ArpCache
</code></pre>
<ul>
<li>System Level: testbenches of this level are located in <a href="./test/cocotb">$(BLUE_ETH)/test/cocotb</a> and implemented in Python based on <a href="https://docs.cocotb.org/en/stable/">cocotb</a> simulation platform. The functional verification of module <strong>UdpIpEthRx</strong> and <strong>UdpIpEthTx</strong> uses <a href="https://github.com/secdev/scapy">scapy</a> to build reference model. And module <strong>UdpIpArpEthRxTx</strong> is tested over virtual network built from docker.</li>
</ul>
<pre><code class="hljs language-bash"><span class="hljs-comment"># Run tests of UdpIpEthRx/Tx</span>
<span class="hljs-comment"># Enable/Disable support for RDMA by setting SUPPORT_RDAM to True/False</span>
<span class="hljs-built_in">cd</span> $(BLUE_ETH)/test/cocotb
make cocotb TARGET=UdpIpEthTx SUPPORT_RDMA=TRUE

<span class="hljs-comment"># Run simulation on virtual network</span>
<span class="hljs-comment"># Change NET_IFC in run_docker_net_test.sh to the name of your network card</span>
<span class="hljs-built_in">cd</span> $(BLUE_ETH)/test/cocotb
docker build -f ./build_docker/Dockerfile -t ethernet-test ./build_docker
./run_docker_net_test.sh
</code></pre>
<ul>
<li>Simulation with CMAC: The source files and scripts used to run co-simulation of implemented designs and Xilinx CMAC IP are provided in the directory <a href="./test/vivado">$(BLUE_ETH)/test/vivado</a>.</li>
</ul>
<pre><code class="hljs language-bash"><span class="hljs-comment"># Available TARGET includes UdpIpArpEthCmacRxTx/PfcUdpIpArpEthCmacRxTx</span>
<span class="hljs-comment"># Enable/Disable support for RDMA by setting SUPPORT_RDAM to True/False</span>
<span class="hljs-built_in">cd</span> $(BLUE_ETH)/test/vivado
make sim TARGET=UdpIpArpEthCmacRxTx SUPPORT_RDMA=False
</code></pre>
<h3 id="run-synthesis-and-implementation">Run Synthesis and Implementation</h3>
<p>Scripts used to run synthesis and implementation of designs are provided in the directory <a href="./syn">$(BLUE_ETH)/syn</a>.</p>
<pre><code class="hljs language-bash"><span class="hljs-comment"># TARGET specifies the top module to be synthsized or implemented</span>
<span class="hljs-comment"># SUPPORT_RDMA specifies whether modules supports RoCE packet processing</span>
<span class="hljs-comment"># ONLYSYNTH decides whether or not run implemetation after synthesis</span>
<span class="hljs-built_in">cd</span> $(BLUE_ETH)/syn
make vivado TARGET=UdpIpArpEthRxTx SUPPORT_RDMA=False ONLYSYNTH=0
</code></pre>
<h3 id="usage">Usage</h3>
<ul>
<li>Verilog User: The BSV designs provided in this repo can generate Verilog codes to be integrated in other projects. Some modules has been wrapped with modules provided in <a href="https://github.com/wengwz/blue-wrapper">blue-wrapper</a> to generate ready-to-use Verilog interface, including <strong>mkRawUdpIpEthRx</strong>, <strong>mkRawUdpIpArpEthRxTx</strong> and <strong>mkRawUdpIpEthRx</strong>. For other modules, you can also wrap them if needed. To generate Verilog codes, you can follow commands below and the generated codes are located in $(BLUE_ETH)/test/cocotb/verilog</li>
</ul>
<pre><code class="hljs language-bash"><span class="hljs-comment"># TARGET specifies the name of top module to be generated</span>
<span class="hljs-comment"># Specify SUPPORT_RDMA if needed</span>
<span class="hljs-built_in">cd</span> $(BLUE_ETH)/test/cocotb
make verilog TARGET=UdpIpEthTx SUPPORT_RDMA=TRUE
</code></pre>
<ul>
<li>BSV User: For designers using BSV, it’s more convenient to integrate modules provided in this repo into their own projects. Just import used package in your codes and add source file paths of this repo to compile options:</li>
</ul>
<pre><code class="hljs language-bash">bsc -p +:$(BLUE_ETH)/src:$(BLUE_ETH)/src/includes ...
</code></pre>
<h2 id="related-links">Related Links</h2>
<p>The implementation of blue-ethernet involves the usage of following external libraries:</p>
<ul>
<li>blue-crc: <a href="https://github.com/datenlord/blue-crc.git">https://github.com/datenlord/blue-crc.git</a></li>
<li>blue-wrapper: <a href="https://github.com/wengwz/blue-wrapper">https://github.com/wengwz/blue-wrapper</a></li>
</ul>`;export{u as assetURLs,b as default,g as metadata,f as toc};
