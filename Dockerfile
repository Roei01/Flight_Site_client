# השתמש בתמונה רשמית של Node.js לבנייה
FROM node:20 AS build

# הגדרת ספריית העבודה
WORKDIR /app

# העתקת קבצי הפרויקט והתקנת תלויות
COPY package*.json ./
RUN npm install
COPY . .

# בניית האפליקציה
RUN npm run build --prod

# שלב שני: שרת Nginx לאירוח
FROM nginx:latest
COPY --from=build /app/dist/your-angular-project-name /usr/share/nginx/html

# פתיחת הפורט שבו Nginx ירוץ
EXPOSE 80
