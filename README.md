# Press Advantage n8n Community Node

![Press Advantage](/nodes/PressAdvantage/press-advantage.png)

## Overview

The **Press Advantage n8n Community Node** allows you to integrate the **Press Advantage API** directly into your **n8n automation workflows**.

[n8n](https://n8n.io) is a workflow automation platform that lets you connect services and automate business processes without writing code. With this community node, users can manage **organizations**, **press releases**, and **editorial / distribution workflows** from their Press Advantage account inside n8n.

This node is published as an **n8n community node**, meaning it can be installed directly from the n8n UI and used in custom workflows.

---

## Features

### Organization Management

* Get all organizations
* Get organization by ID
* Create organizations
* Update organizations
* Fetch all releases for an organization

### Release Management

* Get all releases
* Get release by ID
* Create self-written releases
* Create written-for-you releases (writing service)
* Revise content
* Approve or reject content
* Editorial sandbox workflows
* Distribution lifecycle actions (ordered, completed)
* Editor approval / rejection
* Writer delivery simulation
* Customer revision and approval flows
* Distribution sandbox triggers

---

## Authentication

This node uses **API Key authentication**.

### How to get your API Key

1. Log in to your **Press Advantage** account
2. Navigate to **Account Settings tab**
3. Copy your **API Key**

### Configure credentials in n8n

1. Open **n8n**
2. Go to **Credentials**
3. Create new credentials for **Press Advantage API**
4. Paste your API Key
5. Save

Once saved, select these credentials in the Press Advantage node.

---

## Installation

### Install from n8n Community Nodes

1. Open **n8n**
2. Go to **Settings → Community Nodes**
3. Click **Install**
4. Enter the package name:

```
n8n-nodes-press-advantage
```

5. Restart n8n

The **Press Advantage** node will now be available in your node list.

---

## Usage

1. Add the **Press Advantage** node to your workflow
2. Select a **Resource**:

   * Organization
   * Release
3. Select an **Action** (operation)
4. Fill in required fields
5. Execute the workflow

The node uses a **declarative (low-code) approach**, meaning:

* No manual HTTP requests required
* Built-in error handling
* Automatic request execution

---

## API Base Configuration

All requests are sent to:

```
https://app.pressadvantage.com/api/customers
```

Authentication is handled using the API key as a query parameter.

---

## Development

### Prerequisites

* Node.js **v22+**
* npm
* git
* docker

### Local Development

```bash
docker compose build
docker compose up
```

This will:

* Build the node
* Start n8n locally
* Load your custom node automatically

Access n8n at:

```
http://localhost:5678
```

## Resources

* n8n Docs: [https://docs.n8n.io](https://docs.n8n.io)
* Community Forum: [https://community.n8n.io](https://community.n8n.io)
* Press Advantage: [https://www.pressadvantage.com](https://www.pressadvantage.com)

---

## License

MIT License
