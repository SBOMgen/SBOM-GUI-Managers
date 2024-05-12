# SBOMGEN - Software Bill of Materials Generator

## Introduction

SBOMGEN is an organization dedicated to automating the generation of Software Bill of Materials (SBOM) in CycloneDX format, facilitating the management of dependencies and vulnerabilities within software projects. SBOMGEN provides a comprehensive solution consisting of several repositories tailored to different aspects of SBOM generation and management.

### What is SBOM?

A Software Bill of Materials (SBOM) is a detailed inventory of components used in a software project. It helps in understanding the composition of the software, including its dependencies and associated vulnerabilities, which is crucial for managing security risks, license compliance, and supply chain transparency.

### What is CycloneDX?

CycloneDX is an open standard for representing SBOMs in a machine-readable format. It provides a structured way to describe the components and dependencies of a software project, making it easier to share, analyze, and integrate SBOMs into various tools and workflows.

## Repositories

### 1. SBOM-CLI-Tool

The `SBOM-CLI-Tool` repository is a Python package designed to generate SBOMs in CycloneDX format. It is published as a pip package, making it easily installable and usable in various environments. The CLI tool integrates seamlessly into existing build processes, allowing for automated SBOM generation as part of the development workflow.

Repository Link: [SBOM-CLI-Tool](https://github.com/SBOMgen/SBOM-CLI-Tool)

### 2. SBOM-Automation

The `SBOM-Automation` repository contains workflows that can be integrated into any GitHub project to automate SBOM generation using the `SBOM-CLI-Tool`. These workflows leverage GitHub Actions to trigger SBOM generation on specific events such as code pushes or pull requests. Additionally, the workflows generate vulnerability reports, which are stored within GitHub for easy access and reference.

Repository Link: [SBOM-Automation](https://github.com/SBOMgen/SBOM-Automation)

### 3. SBOM-GUI-Managers

The `SBOM-GUI-Managers` repository hosts a React and Node.js web application that provides a user-friendly interface for managing SBOMs and vulnerability reports. Users can authenticate using their GitHub credentials to access repositories and workflow runs related to SBOM automation. The application presents SBOMs and vulnerability reports in a visually appealing format, enhancing readability and usability.

Repository Link: [SBOM-GUI-Managers](https://github.com/sbomgen/SBOM-GUI-Managers)

## Demo Video

[![SBOMGEN Setup Demo](https://img.youtube.com/vi/BjNL2tf2yOk/0.jpg)](https://www.youtube.com/watch?v=BjNL2tf2yOk)

Click on the image above to watch a demo video demonstrating the setup process to run the SBOMGEN project locally. The video provides step-by-step instructions on setting up each component of the SBOMGEN solution, enabling users to quickly get started with automating SBOM generation and management for their software projects.

## Getting Started

To get started with SBOMGEN, follow these steps:

1. Clone the desired repositories from the SBOMGEN organization on GitHub.
2. Refer to the individual README files in each repository for specific setup instructions.
3. Integrate the SBOM generation workflows into your GitHub projects and customize them as needed.
4. Access the SBOM-GUI-Managers web application to view and manage SBOMs and vulnerability reports.

For additional assistance or inquiries, please reach out to the SBOMGEN community or open an issue in the respective repository.

---

SBOMGEN is committed to simplifying SBOM generation and management, empowering organizations to enhance their software security and compliance practices. Join us in our mission to foster transparency and trust within the software supply chain.