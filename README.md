# Little Genius Academy
Welcome to Little Genius Academy! An interactive, gamified and safe learning platform for kids aged 5-7 that helps them practice English/Math concepts through fun quizzes and challenges while providing progress tracking.

## Purpose
The purpose of Little Genius Academy is to provide a fun and engaging learning platform for young children. Our goal is to foster creativity, critical thinking, and a love for learning through interactive activities and educational games. We aim to support parents and educators in nurturing the intellectual and emotional growth of children in a safe and supportive environment.

This project is built using HTML, CSS, and JavaScript. "Little Genius Academy" has been developed as part of Code Institute's Full-Stack Software Development Bootcamp as our 1st heckathon project. 

## Responsive Image

![Responsive Image](assets/images/responsive-mockup.png)

## User Experience (UX Design)


### User Stories

We used Miro board for user stories and brainstorming sessions. This tool helped us collaborate effectively, visualize our ideas, and organize our thoughts in a structured manner.

#### Primary / Secondary Users

![Users](assets/images/miro1.png)

#### Identify User Needs

![User Needs](assets/images/miro2.png)

#### MoSCoW Prioritization

![MoSCoW Prioritization](assets/images/miro3.png)

#### Summary

![Summary](assets/images/miro4.png)

#### High+level Project Idea

![High-level Project Idea](assets/images/miro5.png)


## Design

### Color Scheme
Our color scheme is designed to be visually appealing and engaging for young children. We use bright, vibrant colors to capture their attention and create a fun learning environment.
![Color](assets/images/Color.png)

### Typography
We use child-friendly fonts that are easy to read and visually appealing. Our primary font is Patrick Hand and heading font is Tilt Warp, which is playful and suitable for our target audience.
![Typography](assets/images/font.png)



### Wireframes
Wireframes were created to plan the layout and structure of our platform. These wireframes helped us ensure a user-friendly interface and a seamless user experience.

#### Desktop Wireframe Basic
![Wireframe basic](assets/images/wireframe1.png)

#### Desktop Wireframe Background
![Wireframe background](assets/images/wireframe2.png)


## Technologies Used

###Languages Used

- HTML
- CSS
- JavaScript

### Frameworks, Libraries and Programs Used

- Bootstrap 5.3: Used for responsive design and styling.
- Google Fonts: Used to import the 'Outfit' and 'Funnel Sans' fonts.
- Font Awesome: Used for icons to enhance the visual appeal.
- Git: Used for version control.
- GitHub: Used to host the repository and deploy the website.
- Balsamiq: Used for creating wireframes.
- Google DevTools: Used for debugging and testing the website.
- Am I Responsive: Used to test the responsiveness of the website across different devices.
- Unsplash: Used for sourcing high-quality, royalty-free images to enhance the visual appeal of the website.
- Google Images: Used for finding images and inspiration for the website's design.
- Snipping Tool: Used for capturing screenshots during the development process.
- Chat GPT: Used for creating user stories
- Copilot: Used in coding some parts

A great tip for this section is to include them as you use them, that way you won't forget what you ended up using when you get to the end of your project.

## Deployment

### GitHub Pages
The project is deployed using GitHub Pages. GitHub Pages allows you to host your website directly from your GitHub repository. To deploy the project, follow these steps:
1. Ensure your repository has an `index.html` file at the root.
2. Navigate to the repository settings.
3. Scroll down to the "GitHub Pages" section.
4. Select the branch you want to deploy from (usually `main` or `master`).
5. Click "Save" and your site will be published at `https://<username>.github.io/<repository-name>/`.

## Local Development

### Prerequisites
To run this project locally, you need to have the following installed on your machine:
- Git
- A code editor (e.g., Visual Studio Code)

### Running the Project
Since this project is built with HTML, CSS, and JavaScript, you can simply open the `index.html` file in your web browser to view the project. Alternatively, you can use a live server extension in your code editor to serve the project locally.

### Making Changes
1. Open the project in your code editor.
2. Make your changes to the code.
3. Save the files.

### Committing and Pushing Changes when working in team

1. **Create a New Branch**
  Before making any changes, create a new branch for your work:
  ```bash
  git checkout -b <branch-name>
  ```

2. **Make Changes**
  Make your changes in the new branch. Ensure that your changes are well-documented and tested.

3. **Commit Changes**
  Add and commit your changes with a descriptive message:
  ```bash
  git add .
  git commit -m "Description of changes"
  ```

4. **Push Changes**
  Push your branch to the remote repository:
  ```bash
  git push origin <branch-name>
  ```

5. **Create a Pull Request**
  Go to the repository on GitHub and create a pull request. Describe the changes you made and request a review from your team members.

6. **Code Review**
  Team members should review the pull request, provide feedback, and request changes if necessary. Once approved, the pull request can be merged into the main branch.

7. **Merge Changes**
  After the pull request is approved, merge the changes into the main branch:
  ```bash
  git checkout main
  git pull origin main
  git merge <branch-name>
  ```

8. **Update Local Repository**
  Ensure your local repository is up-to-date with the main branch:
  ```bash
  git pull origin main
  ```

By following these steps, you can effectively collaborate with your team and maintain a clean and organized codebase.

git git 
### Testing

Validation of HTML/CSS/JavaScript,Lighthouse Audits,Bugs

## Google Lighthouse Testing

Achieved good scores for all the pages.Attaching the results of all the pages ![here](assets/images/LighthouseResult.png)

### Manual Testing & Automatic Testing

### Validators
This code has been validated through HTML and CSS validators, and necessary changes have been made accordingly.

#### CSS Validator

Attaching the result of css validation

![CSS validation](assets/images/CSS-validator%20-result.png)


#### HTML Validator

![HTML Validation](assets/images/HtmlReports.png)

#### JavaScript Validator

![JavaScript Validation](assets/images/JavascriptResults.png)


## Manual Testing 

| Feature       | TestcaseName                                                          | TestcaseSteps                                                                          | TestcaseExpectation                                                                                       | Priority | Result |
|---------------|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|----------|--------|
| Homepage      | Verify if the page is responsive                                      | Verify if the page is responsive                                                       | Check the website in various device like mobile,desktop,ipad                                              | P0       | PASS   |
| Homepage      | Check if  input validation is done                                    | Enter inputs to name field                                                             | Input must be validated and successful.                                                                   | P0       | Pass   |
| Homepage      | Check if  Play button is enable after entering the input              | Once the input is entererd in name field , Play button must be enabled.                | Play button must be enabled after entering  the name                                                      | P0       | PASS   |
| Homepage      | Validate the page using html file validator                           | Use the validator to check the errors in the page.                                     | HTML validation must be successful with no errors                                                         | P2       | PASS   |
| Homepage      | Validate the page using CSS editor                                    | Evaluate css file using css file validator                                             | Css file must pass with zero errors                                                                       | P1       | PASS   |
| Homepage      | Check the performance of the page using Lighthouse developer tool     | Check each page, Click chrome developer tools, select lighthouse and run the analysis  | Page should achieve certain metric as expected.                                                           | P0       | PASS   |
| Category Page | Entering name should take you to quiz Category page.                  | Entering name and start play button should land in category page.                      | Category page to choose subject must appear.                                                              | P1       | PASS   |
| Category Page |  Subject options (ex: Maths and English)  should be available.        | Options to choose maths and english must be available                                  | English and Maths button must be available.                                                               | P1       | PASS   |
| Category Page | Select Subject and start  button should be enabled.                   | Able to choose subject,select it and start the quiz                                    | Subject must be selected to proceed the quiz.                                                             | P0       | PASS   |
| Quiz Page     | Selected subject based quiz must appear                               | Once the subject is choosen, User should be able to see the subject related questions  | Once the backup is enabled , the status of backup must be displayed as Active for the appropriate method. | P2       | PASS   |
| Quiz Page     | If answered wrongly, the question must be repeated.                   | If the wrong answer is choosen,child gets turn to get it correct next time.            | Wrongly answered questions must be repeated.                                                              | P0       | PASS   |
| Quiz Page     | Answering 5 questions correctly should take you to next Level of quiz | If five correct answers are given, user moves to next level.                           | Answering five questions correctly should take the game to next level.                                    | P1       | PASS   |
| Quiz Page     | Try to Play again                                                     | Check if Play Again button is working fine.                                            | Option to Play Again must be available                                                                    | P0       | PASS   |
| Quiz Page     | Try to Choose another subject                                         | USer Should be able to choose some other subject and start the game                    | Option to Choose another subject must be avaialble                                                        | P1       | PASS   |
| Quiz Page     | Validate Js files using Jshint                                        | Validate javascript using jshint                                                       | No error must be observed.                                                                                | P0       | PASS   |

## Credits

### Content References

#### Copilot

- We have utilized GitHub Copilot to assist in generating content for the website.

#### Educational sites
 
- Education Quizzes - Some questions were taken from there.
- Google search engine

## Future features

We have several exciting features planned for future development to enhance the learning experience and provide more value to parents and educators:

- **Feedback to Parents**: Implement a system where parents receive regular feedback on their child's progress, strengths, and areas for improvement. This will help parents stay informed and involved in their child's learning journey.

- **Teacher Assignments**: Allow teachers to assign specific quizzes and challenges to their students. This feature will enable educators to tailor the learning experience to each child's needs and track their progress more effectively.

- **Parental Evaluation Tools**: Develop tools that enable parents to evaluate their child's skill level and understanding of various concepts. This will help parents identify areas where their child may need additional support or practice.

- **Expanded Content Library**: Continuously expand our library of quizzes, challenges, and educational games to cover a wider range of topics and difficulty levels. This will ensure that children always have new and exciting content to explore.

These future features aim to create a more comprehensive and interactive learning environment, supporting the educational growth of children while keeping parents and teachers actively involved.

## Acknowledgement
 
- We would like to extend our heartfelt thanks to **Code Institute** for providing this incredible platform and the opportunity to develop "Little Genius Academy."

- Special thanks to the instructors and mentors - **Emma Lamont**, **Spencer**, and **Ruairidh MacArthur** for their invaluable guidance and support throughout the process.

- We would also like to express our gratitude to our amazing team for their hard work, dedication, and collaboration in bringing "Little Genius Academy" to life.



