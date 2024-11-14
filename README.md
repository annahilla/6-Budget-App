# Budget Calculation App

## Introduction

This is a budget calculation app project built with React and Tailwind CSS. The app allows users to input different customization options for a website and instantly calculates the total price based on their selections. The user interface is interactive, with dynamic fields such as checkboxes, input fields, and buttons, enabling a smooth experience for budget adjustments. Additionally, users can save their budget and share it by sending the URL with the saved budget.

## Tecnologies used

- **HTML**: For structuring the content.
- **Tailwind**: For styling and layout.
- **React**: For implementing app logic and dynamic style switching.
- **Vite**: For setting up the React project with fast development and optimized build.

## Features

- **Interactive Inputs:** Users can select options using checkboxes, input fields, and buttons.
- **Real-Time Budget Calculation:** The app calculates the total price dynamically as the user selects different customization options.
- **Save Budget:** Users can save the calculated budget by clicking a button, and the app will store the budget details in the browser’s local storage.
- **Shareable URL:** Once a budget is saved, the app generates a unique URL containing the budget parameters, which users can share to load the same budget on any device.
- **Responsive Design:** The app adjusts its layout based on the user's device to provide an optimal experience on any screen.
- **Clear Structure:** The application is well-organized with reusable components, ensuring scalability and maintainability.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/annahilla/6-Budget-App
   ```

2. Open folder on your code editor:

   ```bash
   cd 6-Budget-App && code .
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

## Usage

- The app allows users to adjust various options related to the website's customization, such as the number of pages and languages.
- The total price is recalculated dynamically based on user inputs, and the updated budget is displayed in real time.
- Budgets can be saved by filling a form, and the list of saved budgets will show below. You can sort budgets by name, date and you can also search the budgets using a searchbar.
- The app also generates a shareable URL with the saved budget, allowing users to share the link and load the same budget calculation on any device.
