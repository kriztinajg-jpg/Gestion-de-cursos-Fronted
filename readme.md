# Course Manager — Sistema de Gestión de Cursos

Aplicación web administrativa para gestionar estudiantes, cursos y matrículas, construida como proyecto del curso de Análisis y Desarrollo de Software.

## Hito 1 (PI): Modelo de dominio consolidado y proyecto funcional

Este hito entrega el modelo de dominio completo (entidades + relaciones), datos de prueba cargados, y el frontend funcionando conectado a una base de datos real.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + Vite |
| Estilos | Tailwind CSS |
| Navegación | React Router DOM |
| Backend temporal (BaaS) | Supabase (PostgreSQL) |
| Backend final (próximas clases) | Spring Boot |

---

## Modelo de dominio

### Entidades

**`cursos`**
| Columna | Tipo | Descripción |
|---|---|---|
| id | bigint (PK, autoincremental) | Identificador único del curso |
| nombre | text, obligatorio | Nombre del curso |
| descripcion | text | Descripción del curso |
| creditos | integer, default 0 | Créditos académicos |
| created_at | timestamp | Fecha de creación del registro |

**`estudiantes`**
| Columna | Tipo | Descripción |
|---|---|---|
| id | bigint (PK, autoincremental) | Identificador único del estudiante |
| nombres | text, obligatorio | Nombres del estudiante |
| apellidos | text, obligatorio | Apellidos del estudiante |
| email | text, único | Correo electrónico (no se repite entre estudiantes) |
| created_at | timestamp | Fecha de creación del registro |

**`matriculas`**
| Columna | Tipo | Descripción |
|---|---|---|
| id | bigint (PK, autoincremental) | Identificador único de la matrícula |
| estudiante_id | bigint (FK → estudiantes.id) | Estudiante matriculado |
| curso_id | bigint (FK → cursos.id) | Curso al que se matricula |
| fecha_matricula | date, default hoy | Fecha en que se realizó la matrícula |
| created_at | timestamp | Fecha de creación del registro |

### Relaciones