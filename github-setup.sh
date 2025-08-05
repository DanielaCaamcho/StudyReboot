#!/bin/bash

# StudyReboot - GitHub Setup Script
# Autor: DanielaCaamcho

echo "🚀 Configurando repositorio StudyReboot en GitHub..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# GitHub username
GITHUB_USER="DanielaCaamcho"
REPO_NAME="study-reboot"

echo -e "${BLUE}📋 Pasos para subir el proyecto a GitHub:${NC}"
echo ""

echo -e "${YELLOW}1.${NC} Ve a GitHub.com y crea un nuevo repositorio:"
echo "   - Nombre: $REPO_NAME"
echo "   - Descripción: Aplicación web de productividad para estudiantes con timer y seguimiento de progreso"
echo "   - ❌ NO inicialices con README, .gitignore o license (ya los tenemos)"
echo ""

echo -e "${YELLOW}2.${NC} Una vez creado el repositorio, ejecuta estos comandos:"
echo ""
echo -e "${GREEN}git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git${NC}"
echo -e "${GREEN}git branch -M main${NC}"
echo -e "${GREEN}git push -u origin main${NC}"
echo ""

echo -e "${BLUE}🎯 Alternativa con SSH (recomendado):${NC}"
echo -e "${GREEN}git remote add origin git@github.com:$GITHUB_USER/$REPO_NAME.git${NC}"
echo -e "${GREEN}git push -u origin main${NC}"
echo ""

echo -e "${BLUE}📊 Estado actual del repositorio:${NC}"
git log --oneline -3
echo ""

echo -e "${BLUE}📁 Archivos en el repositorio:${NC}"
git ls-files | head -10
if [ $(git ls-files | wc -l) -gt 10 ]; then
    echo "... y $(( $(git ls-files | wc -l) - 10 )) archivos más"
fi
echo ""

echo -e "${GREEN}✅ Listo! Sigue las instrucciones de arriba para subir tu proyecto.${NC}"
echo ""
echo -e "${YELLOW}💡 Tip:${NC} Después de subir, puedes configurar GitHub Pages para deployar automáticamente."
