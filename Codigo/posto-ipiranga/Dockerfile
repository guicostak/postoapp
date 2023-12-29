FROM openjdk:17.0.1-jdk-slim as builder

#rodar comando maven para rodar aplicação jar
RUN apt-get update && apt-get install -y curl

RUN curl -fsSL https://dlcdn.apache.org/maven/maven-3/3.9.4/binaries/apache-maven-3.9.4-bin.tar.gz -o /tmp/apache-maven.tar.gz

# Extrair o Maven
RUN tar -xzf /tmp/apache-maven.tar.gz -C /opt

# Remover o arquivo baixado
RUN rm /tmp/apache-maven.tar.gz

# Definir variáveis de ambiente do Maven
ENV MAVEN_HOME /opt/apache-maven-3.9.4
ENV PATH $MAVEN_HOME/bin:$PATH

WORKDIR app

COPY . .


RUN mvn clean package

FROM openjdk:17.0.1-jdk-slim as deploy

COPY --from=builder /app/target/*.jar /app.jar

# Exponha a porta em que a aplicação vai rodar
EXPOSE $PORT

# Comando para executar a aplicação quando o contêiner for iniciado
CMD ["java", "-jar", "/app.jar", "--spring.profiles.active=deploy"]