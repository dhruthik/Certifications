FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/SpringMongoProject-0.0.1-SNAPSHOT.jar SpringMongoProject.jar
EXPOSE 4200
CMD ["java", "-jar", "SpringMongoProject.jar "]