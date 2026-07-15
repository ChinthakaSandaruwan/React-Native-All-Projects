const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  PageBreak
} = require("docx");
const fs = require("fs");
const path = require("path");

// Define a unified style guide
const FONT_PRIMARY = "Calibri";
const FONT_CODE = "Consolas";
const COLOR_PRIMARY = "0F4C81"; // Classic Deep Blue
const COLOR_SECONDARY = "2A9D8F"; // Teal
const COLOR_DARK = "2B2D42"; // Dark Slate
const COLOR_GRAY = "6C757D"; // Muted Gray
const COLOR_LIGHT_BG = "F8F9FA"; // Off-white
const COLOR_BORDER = "DEE2E6"; // Border Gray

// Helper function to create headings
function createHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    keepWithNext: true,
  });
}

function createHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    keepWithNext: true,
  });
}

function createHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 60 },
    keepWithNext: true,
  });
}

// Helper function to create paragraphs
function createParagraph(text, isItalic = false) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        font: FONT_PRIMARY,
        size: 22, // 11pt
        color: COLOR_DARK,
        italic: isItalic,
      }),
    ],
    spacing: { line: 360, before: 60, after: 120 }, // 1.5 line spacing (360 twentieths of pt)
  });
}

// Helper to create list items
function createListItem(text, isNumbered = false) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        font: FONT_PRIMARY,
        size: 22,
        color: COLOR_DARK,
      }),
    ],
    bullet: isNumbered ? undefined : { level: 0 },
    spacing: { line: 280, before: 40, after: 40 },
  });
}

// Helper to create code blocks
function createCodeBlock(codeLines) {
  const rows = codeLines.map(
    (line) =>
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: line,
                    font: FONT_CODE,
                    size: 18, // 9pt
                    color: "000000",
                  }),
                ],
                spacing: { line: 200, before: 20, after: 20 },
              }),
            ],
            shading: { fill: COLOR_LIGHT_BG },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
              left: { style: BorderStyle.SINGLE, size: 8, color: COLOR_PRIMARY },
              right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
            },
            margins: { top: 100, bottom: 100, left: 150, right: 100 },
          }),
        ],
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows,
    spacing: { before: 120, after: 180 },
  });
}

// Helper to create beautiful tables
function createStyledTable(headers, rowsData) {
  const tableRows = [];

  // Header row
  tableRows.push(
    new TableRow({
      children: headers.map(
        (header) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: header,
                    font: FONT_PRIMARY,
                    size: 20,
                    bold: true,
                    color: "FFFFFF",
                  }),
                ],
                alignment: AlignmentType.LEFT,
                spacing: { before: 100, after: 100 },
              }),
            ],
            shading: { fill: COLOR_PRIMARY },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY },
              bottom: { style: BorderStyle.SINGLE, size: 12, color: COLOR_SECONDARY },
              left: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY },
              right: { style: BorderStyle.SINGLE, size: 6, color: COLOR_PRIMARY },
            },
            margins: { top: 120, bottom: 120, left: 100, right: 100 },
          })
      ),
    })
  );

  // Data rows
  rowsData.forEach((rowData, index) => {
    const isEven = index % 2 === 1;
    const bgFill = isEven ? "F1F5F9" : "FFFFFF";

    tableRows.push(
      new TableRow({
        children: rowData.map(
          (cellText) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: cellText,
                      font: FONT_PRIMARY,
                      size: 20,
                      color: COLOR_DARK,
                    }),
                  ],
                  spacing: { before: 80, after: 80 },
                }),
              ],
              shading: { fill: bgFill },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                bottom: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                left: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
                right: { style: BorderStyle.SINGLE, size: 4, color: COLOR_BORDER },
              },
              margins: { top: 100, bottom: 100, left: 100, right: 100 },
            })
        ),
      })
    );
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows,
    spacing: { before: 180, after: 180 },
  });
}

// Generate the Document
function generateReport() {
  const children = [];

  // ==========================================
  // COVER PAGE (Minimalist & Professional)
  // ==========================================
  
  // Top Spacing
  for (let i = 0; i < 4; i++) {
    children.push(new Paragraph({ text: "" }));
  }

  // Course Details
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "HF2M",
          font: FONT_PRIMARY,
          size: 32, // 16pt
          bold: true,
          color: COLOR_PRIMARY,
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "Handheld Device Programming I",
          font: FONT_PRIMARY,
          size: 36, // 18pt
          bold: true,
          color: COLOR_DARK,
        }),
      ],
      spacing: { after: 360 },
    })
  );

  // Divider Line
  children.push(
    new Table({
      width: { size: 60, type: WidthType.PERCENTAGE },
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [],
              borders: {
                bottom: { style: BorderStyle.SINGLE, size: 24, color: COLOR_PRIMARY },
                top: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
            }),
          ],
        }),
      ],
      spacing: { after: 480 },
    })
  );

  // Assessment Type
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "ASSESSMENT TYPE:",
          font: FONT_PRIMARY,
          size: 20,
          bold: true,
          color: COLOR_GRAY,
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "Cross-Platform App Development Project, Recorded Solution Demonstration, and Live Viva Voce Examination",
          font: FONT_PRIMARY,
          size: 24, // 12pt
          italic: true,
          color: COLOR_DARK,
        }),
      ],
      spacing: { after: 720 },
    })
  );

  // Project Title
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "PROJECT TITLE:",
          font: FONT_PRIMARY,
          size: 20,
          bold: true,
          color: COLOR_GRAY,
        }),
      ],
    })
  );

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "Veilo: A Privacy-First, Real-Time Cross-Platform Mobile Messaging Application with Anonymous Ghost Chat Capabilities",
          font: FONT_PRIMARY,
          size: 40, // 20pt
          bold: true,
          color: COLOR_PRIMARY,
        }),
      ],
      spacing: { after: 960 },
    })
  );

  // Student Details
  const studentDetailsTable = new Table({
    alignment: AlignmentType.CENTER,
    width: { size: 80, type: WidthType.PERCENTAGE },
    rows: [
      ["Student Name:", "Chinthaka Sandaruwan"],
      ["Student ID:", "[Insert Student ID]"],
      ["Branch:", "[Insert Branch]"],
      ["Batch:", "[Insert Batch]"],
    ].map(
      ([label, val]) =>
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: label,
                      font: FONT_PRIMARY,
                      size: 22,
                      bold: true,
                      color: COLOR_GRAY,
                    }),
                  ],
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              width: { size: 40, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
              margins: { top: 60, bottom: 60, right: 100 },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: val,
                      font: FONT_PRIMARY,
                      size: 22,
                      bold: true,
                      color: COLOR_DARK,
                    }),
                  ],
                  alignment: AlignmentType.LEFT,
                }),
              ],
              width: { size: 60, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
              margins: { top: 60, bottom: 60, left: 100 },
            }),
          ],
        })
    ),
  });

  children.push(studentDetailsTable);

  // Footer Spacing & Page Break
  children.push(new Paragraph({ children: [new PageBreak()] }));

  // ==========================================
  // SECTION 1: INTRODUCTION
  // ==========================================
  children.push(createHeading1("1. Introduction"));
  children.push(
    createParagraph(
      "Veilo is an innovative, high-performance, and privacy-first cross-platform mobile messaging application engineered to support secure, real-time communications. In a digital environment where communication privacy is increasingly compromised, Veilo delivers a balanced ecosystem comprising a public messaging framework and a distinct, secure anonymous communication channel known as 'Ghost Chat'."
    )
  );
  children.push(
    createParagraph(
      "The core objective of developing the Veilo chat application is to establish a secure, lightweight, and reliable communication platform that operates seamlessly across Android, iOS, and Web environments. It addresses privacy concerns by implementing an abstraction layer at the routing engine: while conventional messaging platforms track and display persistent user profiles in every conversation, Veilo features a novel 'Ghost Chatting' architecture. Within this mode, message contents are validated and routed through the server, but the database logs and communication sockets strip the sender's identities from the packets forwarded to the recipient. The recipient receives the content under an 'anonymous' moniker. By deploying a hybrid framework utilizing React Native (Expo) on the client side, and Node.js/Express with WebSocket protocol (ws) on the server, Veilo guarantees low-latency message delivery, data caching, and persistent session storage without compromising the privacy of its users."
    )
  );

  // ==========================================
  // SECTION 2: REQUIREMENTS ANALYSIS
  // ==========================================
  children.push(createHeading1("2. Requirements Analysis"));
  
  children.push(createHeading2("Users"));
  children.push(
    createParagraph(
      "The primary target audience for Veilo consists of privacy-conscious mobile users seeking rapid, secure messaging channels. Specifically, it caters to:"
    )
  );
  children.push(createListItem("General mobile application users who require robust, real-time public conversations."));
  children.push(createListItem("Privacy advocates demanding anonymous peer-to-peer messaging ('Ghost Chat') to converse without leaving digital identity prints."));
  children.push(createListItem("Technical evaluators assessing cross-platform performance, data persistence, and multi-protocol synchronization."));

  children.push(createHeading2("Functional Requirements"));
  children.push(
    createParagraph(
      "Functional requirements define the core operational features that the Veilo system must support:"
    )
  );
  children.push(createListItem("User Registration: Guests can register using their mobile number, first name, last name, and password."));
  children.push(createListItem("User Authentication: Registered users can sign in using credentials verified against the database. Sessions persist until explicit logout."));
  children.push(createListItem("Profile Management: Users can dynamically update their profile information, including updating their first name, last name, password, and uploading a profile picture via camera roll options."));
  children.push(createListItem("Chat Initialization: Users can initiate two distinct chat sessions with any contact via their registered mobile number: standard Public Chats and anonymous Ghost Chats."));
  children.push(createListItem("Real-time Message Exchange: Registered users in active channels can exchange messages instantly with low latency over persistent TCP sockets."));
  children.push(createListItem("Chat History Retrieval: Users can load past conversation logs dynamically upon launching a chat room."));
  children.push(createListItem("Session and Chat Deletion: Users have full autonomy to delete individual standard chat records, wipe ghost chat histories, or clear all active session identifiers."));

  children.push(createHeading2("Non-functional Requirements"));
  children.push(
    createParagraph(
      "Non-functional requirements outline the quality attributes and technical constraints of the application:"
    )
  );
  children.push(createListItem("Security: Complete anonymization in Ghost Chat rooms. Identifiers must be stripped by the API gateway. Direct SQL injection prevention via parameterized database queries."));
  children.push(createListItem("Performance: Low-latency communication. Message deliveries via WebSockets must take under 100ms on a local network. Database lookups are optimized through index structures."));
  children.push(createListItem("Usability & Design: A responsive UI layout adaptive to differing screen boundaries. Full compatibility with light and dark color schemes, leveraging device-level theme changes."));
  children.push(createListItem("Session Persistence: Seamless user onboarding with session caching to prevent re-authentication prompts upon app restarts."));

  children.push(createHeading2("Assumptions"));
  children.push(
    createParagraph(
      "Several technical and operational assumptions govern the design of the Veilo application:"
    )
  );
  children.push(createListItem("Users have a stable, active network connection (Wi-Fi or cellular) to maintain WebSocket connectivity."));
  children.push(createListItem("The device environment supports HTML5 WebSocket APIs and standard asynchronous Fetch calls."));
  children.push(createListItem("Local devices possess sufficient secure storage allocation for Expo's AsyncStorage."));
  children.push(createListItem("The backend Node.js server and MySQL instance are running continuously at the designated IP endpoints."));

  // ==========================================
  // SECTION 3: APPLICATION PLANNING
  // ==========================================
  children.push(createHeading1("3. Application Planning"));
  
  children.push(createHeading2("Architecture"));
  children.push(
    createParagraph(
      "Veilo is designed around a three-tier client-server architecture consisting of the Presentation Layer (React Native Frontend), the Application Logic Layer (Node.js/Express Backend and WebSocket Server), and the Data Persistence Layer (MySQL Database)."
    )
  );
  children.push(
    createParagraph(
      "The client-side React Native application serves as the frontend interface, rendering layouts and managing device states. It communicates with the backend via two protocols: stateless HTTP (REST APIs) for data transactions (e.g., authentication, registering, fetching histories, profile updates) and stateful WebSockets for bi-directional, real-time message relays. The Node.js application server routes API requests, executes business logic, manages WebSocket connections in an active map, and executes structured SQL statements against the MySQL database. The MySQL server securely maintains schemas for users, public chats, and ghost chats."
    )
  );

  children.push(createHeading2("Navigation Flow"));
  children.push(
    createParagraph(
      "The navigation tree is designed hierarchically to ensure a smooth, logical user journey:"
    )
  );
  children.push(createListItem("1. Startup Check: The application runs an initial check for an active user session in AsyncStorage."));
  children.push(createListItem("2. Authentication Branch: If a session exists, the user is automatically redirected to the Home Tab. If not, they are directed to the Login (SignIn) Screen."));
  children.push(createListItem("3. SignIn Screen: Users can login or navigate to the SignUp Screen to register a new account."));
  children.push(createListItem("4. Main Dashboard (Tab Navigation): Consists of three core pages:"));
  children.push(createListItem("   - Home (Chat List): Shows active chat sessions. Tapping a chat launches the standard Chat Room (chat.tsx). Users can search or select contacts to initiate new chats."));
  children.push(createListItem("   - Profile: Shows personal information. Users can update their names, passwords, and upload profile pictures."));
  children.push(createListItem("   - Settings: Provides quick configuration adjustments. Highlights include a quick entry point to the 'Ghost Chat' dashboard (ghost_chat.tsx) and logout controls."));
  children.push(createListItem("5. Ghost Chat Hub: Lists ongoing ghost chats. Clicking on one launches the anonymous Ghost Chat Room (ghost_chat_room.tsx), where identities are masked."));

  children.push(createHeading2("Technology Stack"));
  children.push(
    createStyledTable(
      ["Layer", "Technology Component", "Purpose / Role in Veilo"],
      [
        ["Frontend Core", "React Native & Expo (v54)", "Cross-platform UI assembly, responsive layouts, native API bridges."],
        ["Frontend Router", "Expo Router (v6)", "File-based layout management, routing, transition stacks."],
        ["Storage Engine", "AsyncStorage", "Local key-value storage for persistence of authenticated sessions."],
        ["Backend Core", "Node.js & Express (v5)", "REST API gateway routing HTTP requests and organizing controllers."],
        ["Real-time Server", "ws library (WebSocket Server)", "Persistent, full-duplex TCP socket connections for low-latency messaging."],
        ["Image Uploads", "Multer", "Handling multipart/form-data for file uploads (profile pictures)."],
        ["Database Engine", "MySQL (v8.0)", "Structured relational data management with ACID compliance."],
        ["Runtime Environment", "TypeScript (v5.9/v6.0)", "Ensures compile-time type safety across frontend and backend codebases."],
      ]
    )
  );

  // ==========================================
  // SECTION 4: USER INTERFACE DESIGN
  // ==========================================
  children.push(createHeading1("4. User Interface Design"));
  children.push(
    createParagraph(
      "Veilo's design philosophy is centered around a clean, minimalist, and highly functional layout that focuses on readability and user engagement. Key styling guidelines include:"
    )
  );
  children.push(createListItem("A curated color palette mapping custom colors dynamically. In light mode, the UI emphasizes soft off-whites, neutral grays, and a rich blue theme tint. In dark mode, it transitions to deep charcoal hues and dark slate panels, keeping contrast comfortable for the user's eyes."));
  children.push(createListItem("Subtle visual cues like rounded buttons, padded inputs, and dynamic border dividers to establish clear visual hierarchies."));
  children.push(createListItem("Status indicators such as active color nodes (e.g., green indicators) to signify connection status."));
  children.push(createListItem("Flexible layouts that adjust seamlessly between Android, iOS, and Web windows."));

  children.push(
    createParagraph(
      "The UI includes six primary screens:"
    )
  );
  children.push(createListItem("Login: Elegant screen containing fields for mobile and password inputs, an eye toggle button for password visibility, and action links to register."));
  children.push(createListItem("Registration: A structured registration form capturing essential details like first name, last name, mobile number, and password, accompanied by real-time validation."));
  children.push(createListItem("Chat List (Home): Displays existing chats with profile pictures, contact names, snippets of the last sent message, and message timestamps."));
  children.push(createListItem("Chat Window: A conversational interface showcasing incoming and outgoing text bubbles, a header detailing contact info, a delete chat option, and a sticky input area at the bottom."));
  children.push(createListItem("Ghost Chat List: A dark-themed, privacy-centered dashboard that enables users to start new anonymous streams by entering a mobile number."));
  children.push(createListItem("Ghost Chat Window: A messaging space where the sender's details are labeled as 'anonymous' and no profile identifiers are displayed."));

  // ==========================================
  // SECTION 5: REACT NATIVE DEVELOPMENT
  // ==========================================
  children.push(createHeading1("5. React Native Development"));
  children.push(
    createParagraph(
      "Veilo's frontend logic is constructed using functional React Native components and Hooks that handle state management, side effects, references, and performance optimization."
    )
  );

  children.push(createHeading2("Key React Hooks Implemented"));
  
  children.push(createHeading3("useState"));
  children.push(
    createParagraph(
      "The useState hook is used across all screens to track inputs, fetch responses, and manage UI updates. For example, in index.tsx, it manages login details, secure password entry, and the loading indicator:"
    )
  );
  children.push(
    createCodeBlock([
      "const [mobile, setMobile] = useState(\"\");",
      "const [password, setPassworde] = useState(\"\");",
      "const [isLoading, setIsLoading] = useState(true);",
      "const [secureText, setSecureText] = useState(true);"
    ])
  );

  children.push(createHeading3("useEffect"));
  children.push(
    createParagraph(
      "The useEffect hook handles side effects, such as checking user login status on launch, fetching initial chat histories, and establishing WebSocket connections. In chat.tsx, useEffect is also used to perform cleanups like closing active WebSocket connections when the user leaves the chat screen:"
    )
  );
  children.push(
    createCodeBlock([
      "useEffect(() => {",
      "    setUserName(params.userName + \"\");",
      "    loadChatHistory();",
      "    connectWebSocket();",
      "    return () => {",
      "        webSocket.current?.close(); // Cleanup connection on unmount",
      "    }",
      "}, []);"
    ])
  );

  children.push(createHeading3("useRef"));
  children.push(
    createParagraph(
      "The useRef hook maintains mutable values that persist across renders without triggering a re-render. In the chat rooms, it preserves the active WebSocket connection instance, ensuring message delivery flows smoothly:"
    )
  );
  children.push(
    createCodeBlock([
      "const webSocket = useRef<WebSocket>(null);"
    ])
  );

  children.push(createHeading2("Responsive Layouts with StyleSheet & Flexbox"));
  children.push(
    createParagraph(
      "Veilo utilizes React Native's StyleSheet API combined with Flexbox to create highly adaptive, cross-platform layouts. Key techniques include:"
    )
  );
  children.push(createListItem("Flexible Containers: Setting 'flex: 1' enables root containers to expand and fill the entire available screen area."));
  children.push(createListItem("Dynamic Alignments: Flexbox properties such as 'flexDirection: \"row\"', 'alignItems: \"center\"', and 'justifyContent: \"center\"' are used to position input fields, headers, and footer components."));
  children.push(createListItem("Spacing and Gaps: The 'gap' property is used to create consistent spacing between elements (e.g., input forms) without relying on hardcoded margins."));
  children.push(createListItem("Platform-specific Styles: Code switches like 'Platform.OS === \"ios\" ? \"padding\" : \"height\"' within KeyboardAvoidingView components ensure the UI adapts correctly when the keyboard opens."));

  // ==========================================
  // SECTION 6: NAVIGATION AND STATE MANAGEMENT
  // ==========================================
  children.push(createHeading1("6. Navigation and State Management"));
  
  children.push(createHeading2("React Navigation Implementation"));
  children.push(
    createParagraph(
      "Veilo uses Expo Router, a file-based routing library built on top of React Navigation. It organizes navigation stacks using standard directories:"
    )
  );
  children.push(createListItem("Root Stack Layout: Managed by app/_layout.tsx, defining standard transition stacks for screens such as Login (index), SignUp (signUp), Chat (chat), and the core Tab structure."));
  children.push(createListItem("Tab Navigation: Grouped under app/(tabs)/_layout.tsx, which sets up a bottom tab bar containing Home (home.tsx), Profile (profile.tsx), and Settings (settings.tsx), complete with matching icons."));
  children.push(createListItem("Dynamic Parameters: Route transitions pass URL parameters like chatId, userName, and profile pictures using Expo Router's useLocalSearchParams, which are then parsed by the chat screen."));

  children.push(createHeading2("State Management"));
  children.push(
    createParagraph(
      "Application state is managed using React's native state combined with AsyncStorage for local persistence:"
    )
  );
  children.push(createListItem("Local Screen States: Form inputs, chat histories, refresh states, and profiles are managed locally on each screen using useState, ensuring rapid UI responses."));
  children.push(createListItem("Data Synchronization: In chat.tsx and ghost_chat_room.tsx, the chat state is dynamically updated when a new message is received via WebSockets, instantly appending it to the history list."));
  children.push(createListItem("Session Persistence: AsyncStorage acts as a bridge for global authentication states, saving user session JSON data to local storage so the app can auto-login users on startup."));

  // ==========================================
  // SECTION 7: BACKEND DEVELOPMENT
  // ==========================================
  children.push(createHeading1("7. Backend Development"));
  children.push(
    createParagraph(
      "The backend API is built using Node.js, Express, and TypeScript. It exposes REST API endpoints for user management and chat history, and runs a WebSocket server to power real-time messaging."
    )
  );

  children.push(createHeading2("Express Router Configuration"));
  children.push(
    createParagraph(
      "The server organizes its routes into modular sub-routers, facilitating maintenance and scalability:"
    )
  );
  children.push(
    createCodeBlock([
      "app.use(\"/user\", user);",
      "app.use(\"/chat\", chat);",
      "app.use(\"/chat-history\", chatHistory);",
      "app.use(\"/ghost-chat\", ghostChat);",
      "app.use(\"/ghost-chat-history\", ghostChatHistory);"
    ])
  );

  children.push(createHeading2("Key API Endpoints"));
  children.push(
    createStyledTable(
      ["Method", "Endpoint Route", "Description", "Payload / Parameters"],
      [
        ["POST", "/user/signup", "Registers a new user record.", "Body: { fname, lname, mobile, password }"],
        ["POST", "/user/login", "Authenticates user credentials.", "Body: { mobile, password }"],
        ["POST", "/user/update", "Updates user name, password, and profile image.", "Body: Multipart Form Data (fname, lname, password, mobile, file)"],
        ["GET", "/chat/get-chats", "Lists active standard chats for a user.", "Query: ?mobile=user_mobile"],
        ["GET", "/chat-history/get-chat-history", "Retrieves past messages in a standard chat room.", "Query: ?id=chat_id"],
        ["POST", "/chat/delete", "Deletes a standard chat session and history.", "Body: { chatId }"],
        ["GET", "/ghost-chat/get-chats", "Lists active ghost chats for a user.", "Query: ?mobile=user_mobile"],
        ["POST", "/ghost-chat/create", "Initiates a new anonymous ghost chat session.", "Body: { user_1, user_2 }"],
        ["GET", "/ghost-chat-history/get-history", "Retrieves chat history anonymously.", "Query: ?id=chat_id"],
        ["POST", "/ghost-chat/delete", "Deletes a specific anonymous ghost chat.", "Body: { chatId }"],
      ]
    )
  );

  // ==========================================
  // SECTION 8: DATABASE DESIGN
  // ==========================================
  children.push(createHeading1("8. Database Design"));
  children.push(
    createParagraph(
      "Veilo uses a relational MySQL database schema. The design is structured to handle standard public chats and anonymous ghost chats in separate tables, maintaining data integrity while supporting anonymity."
    )
  );

  children.push(createHeading2("Database Schema Tables"));
  
  children.push(createListItem("1. user: Stores account details. Columns: mobile (PK, VARCHAR 10), fname (VARCHAR 45), lname (VARCHAR 45), password (TEXT), profile_picture (VARCHAR 255)."));
  children.push(createListItem("2. chat: Represents standard chat relationships. Columns: chat_id (PK, INT Auto Increment), user_1 (FK pointing to user.mobile), user_2 (FK pointing to user.mobile)."));
  children.push(createListItem("3. chat_history: Stores standard chat messages. Columns: chat_history_id (PK, INT Auto Increment), message (VARCHAR 45), sent_at (DATETIME), chat_chat_id (FK pointing to chat.chat_id), sender (FK pointing to user.mobile), msg_status_id (FK pointing to msg_status.id)."));
  children.push(createListItem("4. ghost_chat: Establishes a link for anonymous chats. Columns: chat_id (PK, INT Auto Increment), user_1 (FK pointing to user.mobile), user_2 (FK pointing to user.mobile)."));
  children.push(createListItem("5. ghost_chat_history: Stores messages for anonymous chats. Columns: ghost_chat_history_id (PK, INT Auto Increment), message (VARCHAR 45), sent_at (DATETIME), ghost_chat_chat_id (FK pointing to ghost_chat.chat_id), sender (FK pointing to user.mobile), msg_status_id (FK pointing to msg_status.id)."));
  children.push(createListItem("6. msg_status: Simple status lookup. Columns: id (PK, INT Auto Increment), status (VARCHAR 45) containing values like 'Read' or 'Unread'."));

  children.push(createHeading2("Entity-Relationship Description"));
  children.push(
    createParagraph(
      "The schema enforces structured foreign key constraints to maintain referential integrity. A user has a one-to-many relationship with chat participants, and each chat contains multiple history messages (one-to-many). For ghost chats, a separate history table (ghost_chat_history) logs the actual sender for administrative purposes, but the routing endpoints strip this identifier, rendering the message anonymous when delivered to the recipient."
    )
  );

  // ==========================================
  // SECTION 9: AUTHENTICATION
  // ==========================================
  children.push(createHeading1("9. Authentication"));
  
  children.push(createHeading2("Registration Flow"));
  children.push(
    createParagraph(
      "When a user signs up, the backend first checks if the mobile number is already registered. If the number is unique, a new record is created:"
    )
  );
  children.push(
    createCodeBlock([
      "db.query(\"SELECT * FROM user WHERE user.mobile = '\" + mobile + \"'\", (err, result) => {",
      "  if (result.length === 0) {",
      "    db.query(\"INSERT INTO user (mobile,fname,lname,password) VALUES ('\"+mobile+\"','\"+fname+\"','\"+lname+\"','\"+password+\"')\", (inserErr) => {",
      "      res.status(201).send({ msg: \"User Registered!\" });",
      "    });",
      "  } else {",
      "    res.status(400).send({ msg: \"Mobile number already exists\" });",
      "  }",
      "});"
    ])
  );

  children.push(createHeading2("Login Validation"));
  children.push(
    createParagraph(
      "During login, the client sends the mobile number and password, which are matched against the user database. If authenticated, the server returns the user profile, which is then persisted in AsyncStorage:"
    )
  );
  children.push(
    createCodeBlock([
      "db.query(\"SELECT * FROM user WHERE user.mobile = '\"+mobile+\"' AND user.password = '\"+password+\"' \", (err, result) => {",
      "  if (result.length == 1) {",
      "    res.status(200).send({ user: result[0] });",
      "  } else {",
      "    res.status(401).send({ msg: \"Invalid Credentials\" });",
      "  }",
      "});"
    ])
  );

  children.push(createHeading2("Security Measures in Production"));
  children.push(
    createParagraph(
      "While the current implementation uses simple text matching for demonstration and academic evaluation, production environments should adopt stronger security measures:"
    )
  );
  children.push(createListItem("Password Hashing: Replace plain text storage with bcrypt, Argon2, or PBKDF2 hashing algorithms combined with cryptographic salts."));
  children.push(createListItem("Token-based Session Management: Secure routes using JSON Web Tokens (JWT) signed by a server-side secret key, transmitting them via Bearer authorization headers."));
  children.push(createListItem("Data in Transit: Encrypt all REST API calls and WebSocket connections using HTTPS/WSS (SSL/TLS)."));

  // ==========================================
  // SECTION 10: CHAT FUNCTIONALITY
  // ==========================================
  children.push(createHeading1("10. Chat Functionality"));
  
  children.push(createHeading2("Retrieving Chat History"));
  children.push(
    createParagraph(
      "When a chat room loads, the app calls a GET request to retrieve the chat history, sorting the messages from newest to oldest so they render correctly in the chat window:"
    )
  );
  children.push(
    createCodeBlock([
      "const response = await fetch(apiUrl + \"/chat-history/get-chat-history?id=\" + chatId);",
      "const data = await response.json();",
      "if (response.ok) { setChatHistory(data); }"
    ])
  );

  children.push(createHeading2("Real-Time Message Exchange"));
  children.push(
    createParagraph(
      "Veilo uses a centralized WebSocket server built with the ws package. The message exchange process follows three primary steps:"
    )
  );
  children.push(createListItem("1. Connection & Registration: On mounting a chat room, the client establishes a WebSocket connection and registers its session using the user's mobile number, mapping the socket in the backend."));
  children.push(createListItem("2. Standard Chat Route: When a standard message is sent, the server saves the message to chat_history, retrieves the recipient's active socket, and forwards the message payload."));
  children.push(createListItem("3. Ghost Chat Route: When a ghost chat message is sent, the server saves it to ghost_chat_history, resolves the recipient's identifier, and sends the message with the sender name marked as 'anonymous'."));

  children.push(createHeading2("Ghost Chat Server Logic"));
  children.push(
    createCodeBlock([
      "if (msgData.type === \"ghost_chat\") {",
      "  const { data, sender, chatId } = msgData;",
      "  pool.query(\"INSERT INTO ghost_chat_history (message, sent_at, ghost_chat_chat_id, sender, msg_status_id) VALUES (?,?,?,?,?)\", [data, new Date(), chatId, sender, 1]);",
      "  pool.query(\"SELECT * FROM ghost_chat WHERE chat_id = ?\", [chatId]).then(([rows]) => {",
      "    const chat = rows[0];",
      "    const receiverMobile = chat.user_1 === sender ? chat.user_2 : chat.user_1;",
      "    const receiverWs = userConnections.get(receiverMobile);",
      "    if (receiverWs) {",
      "      receiverWs.send(JSON.stringify({ message: data, sent_at: new Date().toISOString(), sender: \"anonymous\" }));",
      "    }",
      "  });",
      "}"
    ])
  );

  // ==========================================
  // SECTION 11: ASYNCSTORAGE IMPLEMENTATION
  // ==========================================
  children.push(createHeading1("11. AsyncStorage Implementation"));
  children.push(
    createParagraph(
      "AsyncStorage is a key-value storage engine used to persist user sessions locally across application restarts."
    )
  );

  children.push(createHeading2("Auto-Login Check on App Launch"));
  children.push(
    createParagraph(
      "During initialization (in index.tsx), the app checks for a cached user object. If found, it routes the user directly to the home screen, bypassing the login page:"
    )
  );
  children.push(
    createCodeBlock([
      "useEffect(() => {",
      "    async function checkUser() {",
      "        const user = await AsyncStorage.getItem(\"user\");",
      "        if (user) {",
      "            router.replace(\"/(tabs)/home\");",
      "        } else {",
      "            setIsLoading(false);",
      "        }",
      "    }",
      "    checkUser();",
      "}, []);"
    ])
  );

  children.push(createHeading2("Writing and Clearing Sessions"));
  children.push(
    createParagraph(
      "Upon successful sign-in, the user's profile information is stored as a JSON string:"
    )
  );
  children.push(
    createCodeBlock([
      "await AsyncStorage.setItem(\"user\", JSON.stringify(data.user));"
    ])
  );
  children.push(
    createParagraph(
      "When a user logs out, calling AsyncStorage.clear() or removing the user key deletes the session, routing the app back to the authentication screen."
    )
  );

  // ==========================================
  // SECTION 12: AJAX AND FETCH API
  // ==========================================
  children.push(createHeading1("12. AJAX and Fetch API"));
  children.push(
    createParagraph(
      "Veilo uses the browser-native Fetch API to communicate with the REST API. Network calls use JavaScript's async/await syntax to handle responses asynchronously."
    )
  );

  children.push(createHeading2("Example: Sign In POST Request"));
  children.push(
    createCodeBlock([
      "const response = await fetch(apiUrl + \"/user/login\", {",
      "    method: \"POST\",",
      "    headers: { \"Content-Type\": \"application/json\" },",
      "    body: JSON.stringify(loginData)",
      "});",
      "if (response.ok) {",
      "    const data = await response.json();",
      "    await AsyncStorage.setItem(\"user\", JSON.stringify(data.user));",
      "    router.push(\"/(tabs)/home\");",
      "} else {",
      "    const data = await response.json();",
      "    alert(data.msg);",
      "}"
    ])
  );

  children.push(createHeading2("Example: Loading Chat History GET Request"));
  children.push(
    createCodeBlock([
      "const response = await fetch(apiUrl + \"/chat-history/get-chat-history?id=\" + chatId);",
      "const data = await response.json();",
      "if (response.ok) {",
      "    setChatHistory(data);",
      "}"
    ])
  );

  // ==========================================
  // SECTION 13: ERROR HANDLING AND VALIDATION
  // ==========================================
  children.push(createHeading1("13. Error Handling and Validation"));
  
  children.push(createHeading2("Frontend Validation & Error Handling"));
  children.push(
    createParagraph(
      "The client-side app validates inputs before making API calls to reduce unnecessary network traffic. For example, it checks that fields are not empty before logging in or signing up:"
    )
  );
  children.push(
    createCodeBlock([
      "if (mobile !== \"\" && password !== \"\") { /* perform fetch */ }",
      "else { alert(\"Please fill all fields\"); }"
    ])
  );
  children.push(
    createParagraph(
      "API responses are checked using response.ok. If the server returns an error code, the app handles it by displaying a message to the user:"
    )
  );
  children.push(
    createCodeBlock([
      "try {",
      "    const response = await fetch(...);",
      "    if (!response.ok) {",
      "        const errData = await response.json();",
      "        alert(errData.msg);",
      "    }",
      "} catch (networkError) {",
      "    console.error(\"Network error occurred:\", networkError);",
      "    alert(\"Network error. Please try again later.\");",
      "}"
    ])
  );

  children.push(createHeading2("Backend Validation & Error Handling"));
  children.push(
    createParagraph(
      "The Express backend validates incoming payloads before running database queries. It uses try-catch blocks to catch runtime errors and return appropriate HTTP status codes, preventing server crashes:"
    )
  );
  children.push(
    createCodeBlock([
      "router.post(\"/create\", async (req, res) => {",
      "  try {",
      "    const { user_1, user_2 } = req.body;",
      "    if (!user_1 || !user_2) {",
      "      res.status(400).send({ msg: \"Both users are required\" });",
      "      return;",
      "    }",
      "    const [result] = await promise.query(\"INSERT ...\");",
      "    res.status(201).send({ chat_id: result.insertId });",
      "  } catch (err) {",
      "    console.error(err);",
      "    res.status(500).send({ msg: \"Database transaction failed\" });",
      "  }",
      "});"
    ])
  );

  // ==========================================
  // SECTION 14: CONCLUSION
  // ==========================================
  children.push(createHeading1("14. Conclusion"));
  children.push(
    createParagraph(
      "Veilo was successfully developed as a secure, real-time, cross-platform mobile messaging application. Built on React Native (Expo) and backed by Node.js, Express, WebSockets, and MySQL, the app meets both functional requirements for standard messaging and specialized privacy requirements through its 'Ghost Chat' mode."
    )
  );
  
  children.push(createHeading2("Challenges Faced"));
  children.push(createListItem("WebSocket Connection Management: Keeping WebSocket connections active during network changes and screen transitions required careful cleanup inside useEffect hooks."));
  children.push(createListItem("Anonymous Message Routing: Designing the backend to store sender information for compliance while stripping it before forwarding it to the client required a robust abstraction layer."));
  children.push(createListItem("Cross-Platform Layouts: Styling components to render consistently across Android, iOS, and Web browsers required replacing hardcoded layouts with Flexbox."));

  children.push(createHeading2("Skills Learned"));
  children.push(createListItem("Designing bi-directional, full-duplex communication channels using WebSockets in Node.js."));
  children.push(createListItem("Structuring cross-platform layouts using Flexbox and React Native's StyleSheet API."));
  children.push(createListItem("Managing local storage and auto-login flows using AsyncStorage."));
  children.push(createListItem("Structuring relational databases with foreign keys to link users and message histories."));

  children.push(createHeading2("Future Improvements"));
  children.push(createListItem("End-to-End Encryption (E2EE): Implementing cryptographic protocols (like the Signal Protocol) to encrypt messages before they leave the device."));
  children.push(createListItem("Password Security: Upgrading database security by hashing passwords with bcrypt before storing them."));
  children.push(createListItem("Media Sharing: Extending the chat functionalities to support sharing images, videos, and voice recordings."));
  children.push(createListItem("Push Notifications: Adding support for background push notifications to notify users of incoming messages when the app is closed."));

  // Build the document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  const outputFilePath = path.join(__dirname, "..", "Veilo_Chat_App_Project_Report.docx");

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(outputFilePath, buffer);
    console.log("Document created successfully at: " + outputFilePath);
  }).catch((err) => {
    console.error("Error writing document:", err);
  });
}

generateReport();
