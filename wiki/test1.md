
---
id: particle-tracking
title: Particle Tracking
title_cn: 粒子追踪
category: Methods
tags:
  - tracking
  - trajectory
  - image analysis
  - python
updated: 2026-08-13
visibility: internal
---

# 粒子追踪 Particle Tracking

## Goal

Particle tracking 的目标是从图像序列中得到粒子的位置随时间的变化：

\[
(x_i(t), y_i(t))
\]

必要时也可以扩展到：

\[
(x_i(t), y_i(t), z_i(t))
\]

## General Workflow

1. 获取原始显微图像；
2. 去除背景；
3. 检测颗粒中心；
4. 亚像素定位；
5. 不同帧之间连接粒子；
6. 得到 trajectory；
7. 进行动力学分析。

## Important Parameters

需要记录：

- particle diameter
- search radius
- threshold
- memory
- minimum trajectory length

## Quality Control

完成 tracking 后必须检查：

- 是否存在明显漏检
- 是否存在两个颗粒错误连接
- 粒子轨迹是否突然跳变
- 边界附近是否存在系统误差

## Typical Analysis

可以计算：

- velocity
- MSD
- diffusion coefficient
- orientation
- persistence time
- pair correlation

## Relation to Research

适用于：

- [[Brownian Motion]]
- [[Bacterial Motility]]
- [[Confined Colloids]]
