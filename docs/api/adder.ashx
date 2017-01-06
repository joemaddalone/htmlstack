<%@ WebHandler Language="VB" Class="adder" Debug="true" %>
Option Strict On
Imports System
Imports System.Web
Imports System.Data
Imports System.Data.SqlClient
Public Class adder
    Implements IHttpHandler
    Implements SessionState.IRequiresSessionState
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim s As New conn.sql
        s.OpenDB()
        Dim ret As New StringBuilder
        Dim tbl As String = ""
        Dim where As String = ""
        Dim fields As String = ""
        context.Response.ContentType = "text/javascript"
        Dim x As New Content()
        x.title = rqF("title")
        x.description = rqF("description")
        x.url = rqF("url")
        x.tags = rqF("tags")
        rW("{""id"":""" & x.create() & """}")
        s.CloseDB()
    End Sub
   
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property
End Class